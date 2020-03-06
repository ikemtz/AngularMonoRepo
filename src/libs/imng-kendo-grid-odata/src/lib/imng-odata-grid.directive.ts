import { Directive, Input, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { IKendoODataGridFacade, KendoODataComponentBase, ODataGridStateChangeEvent } from 'imng-kendo-grid-odata';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[imngODataGrid]',
})
export class ImngODataGridDirective implements OnInit, AfterViewInit, OnDestroy {
  private readonly subscriptions: Subscription[] = [];
  @Input('imngODataGrid') public odataComponent: KendoODataComponentBase<object, IKendoODataGridFacade<object>>;
  constructor(private readonly gridComponent: GridComponent, private readonly changeDetectorRef: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.gridComponent.reorderable = true;
    this.gridComponent.resizable = true;
    this.gridComponent.filterable = 'menu';
    this.gridComponent.sortable = {
      allowUnsort: true,
      mode: 'multiple',
    };
    this.gridComponent.navigable = true;
  }
  ngAfterViewInit(): void {
    const facade = this.odataComponent.facade;
    this.subscriptions.push(
      this.gridComponent.dataStateChange.subscribe((t: ODataGridStateChangeEvent) =>
        this.odataComponent.dataStateChange(t),
      ),
      facade.gridData$.subscribe(t => {
        this.gridComponent.data = t;
        this.changeDetectorRef.markForCheck();
      }),
      facade.loading$.subscribe(t => (this.gridComponent.loading = t)),
      facade.gridPagerSettings$.subscribe(t => (this.gridComponent.pageable = t)),
      facade.gridODataState$.subscribe(t => {
        this.gridComponent.pageSize = t.take;
        this.gridComponent.filter = t.filter;
        this.gridComponent.skip = t.skip;
        this.gridComponent.sort = t.sort;
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(t => {
      if (t) {
        t.unsubscribe();
      }
    });
  }
}

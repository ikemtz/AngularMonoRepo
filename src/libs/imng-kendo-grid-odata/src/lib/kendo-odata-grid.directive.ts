/* eslint-disable @typescript-eslint/ban-types */
import { Directive, Input, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { KendoODataComponentBase } from './kendo-odata-component-base';
import { IKendoODataGridFacade } from './kendo-odata-grid-facade';
import { ODataGridStateChangeEvent } from './kendo-odata-grid-state-change-event';

@Directive({
  selector: '[imngODataGrid]',
})
export class ImngODataGridDirective implements OnInit, AfterViewInit, OnDestroy, Subscribable {
  public readonly allSubscriptions = new Subscriptions();
  private facade: IKendoODataGridFacade<object>;

  @Input('imngODataGrid') public odataComponent: KendoODataComponentBase<object, IKendoODataGridFacade<object>>;
  constructor(private readonly gridComponent: GridComponent, private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.facade = this.odataComponent.facade;
    this.gridComponent.reorderable = true;
    this.gridComponent.resizable = true;
    this.gridComponent.filterable = 'menu';
    this.gridComponent.sortable = {
      allowUnsort: true,
      mode: 'multiple',
    };
    this.gridComponent.navigable = true;
    this.allSubscriptions.push(this.facade.loading$.subscribe((t: boolean) => {
      this.gridComponent.loading = t;
      this.changeDetectorRef.markForCheck();
    }));
  }

  ngAfterViewInit(): void {
    this.allSubscriptions.push(
      this.gridComponent.dataStateChange.subscribe((t: ODataGridStateChangeEvent) =>
        this.odataComponent.dataStateChange(t),
      ),
      this.facade.gridData$.subscribe(t => {
        this.gridComponent.data = t;
        this.changeDetectorRef.markForCheck();
      }),
      this.facade.gridPagerSettings$.subscribe(t => (this.gridComponent.pageable = t)),
      this.facade.gridODataState$.subscribe(t => {
        this.gridComponent.pageSize = t.take;
        this.gridComponent.filter = t.filter;
        this.gridComponent.skip = t.skip;
        this.gridComponent.sort = t.sort;
      }),
    );
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}

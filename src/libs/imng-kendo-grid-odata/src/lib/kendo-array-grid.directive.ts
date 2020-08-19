import { Directive, Input, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { GridComponent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { Subscription } from 'rxjs';
import { ODataGridStateChangeEvent } from './kendo-odata-grid-state-change-event';
import { KendoArrayComponentBase } from './kendo-array-component-base';
import { process, CompositeFilterDescriptor } from '@progress/kendo-data-query';

@Directive({
  selector: '[imngArrayGrid]',
})
export class ImngArrayGridDirective implements OnInit, AfterViewInit, OnDestroy {
  protected readonly subscriptions: Subscription[] = [];
  @Input('imngArrayGrid') public arrayComponent: KendoArrayComponentBase<object, object>;
  constructor(public readonly gridComponent: GridComponent, private readonly changeDetectorRef: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.gridComponent.reorderable = true;
    this.gridComponent.resizable = true;
    this.gridComponent.filterable = 'menu';
    this.gridComponent.sortable = {
      allowUnsort: true,
      mode: 'multiple',
    };
    this.gridComponent.navigable = true;
    this.gridComponent.pageable = {
      info: true,
      type: 'numeric',
      pageSizes: [5, 10, 20, 50, 100],

    };
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.gridComponent.dataStateChange.subscribe((t: ODataGridStateChangeEvent) => {
        this.arrayComponent.dataStateChange(t);
      }),
      this.gridComponent.pageChange.subscribe((t: PageChangeEvent) => {
        this.gridComponent.pageSize = this.arrayComponent.state.take = t.take;
        this.gridComponent.skip = this.arrayComponent.state.skip = t.skip;
        this.changeDetectorRef.markForCheck();
        this.arrayComponent.pageChange(t);
      }),
      this.gridComponent.filterChange.subscribe((t: CompositeFilterDescriptor) => {
        this.gridComponent.filter = this.arrayComponent.state.filter = t;
        this.changeDetectorRef.markForCheck();
        this.arrayComponent.filterChange(t);
      }),
      this.arrayComponent.gridData$.subscribe(s => {
        this.gridComponent.data = s;
        this.changeDetectorRef.markForCheck();
      }),
    );

    this.gridComponent.pageSize = this.arrayComponent.state.take;
    this.gridComponent.filter = this.arrayComponent.state.filter;
    this.gridComponent.skip = this.arrayComponent.state.skip;
    this.gridComponent.sort = this.arrayComponent.state.sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(t => {
      if (t) {
        t.unsubscribe();
      }
    });
  }
}

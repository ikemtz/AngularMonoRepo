import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import {
  GridComponent,
  PageChangeEvent,
  PagerSettings,
} from '@progress/kendo-angular-grid';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { ODataGridStateChangeEvent } from './kendo-odata-grid-state-change-event';
import { KendoArrayBasedComponent } from './kendo-array-base-component';
import {
  CompositeFilterDescriptor,
  SortDescriptor,
} from '@progress/kendo-data-query';
import { hasHiddenColumns } from './kendo-odata-grid.directive';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[imngArrayGrid]',
})
export class ImngArrayGridDirective
  implements OnInit, AfterViewInit, OnDestroy, Subscribable
{
  public readonly allSubscriptions = new Subscriptions();
  @Input('imngArrayGrid') public arrayComponent: KendoArrayBasedComponent<
    object,
    object
  >;
  @Input() public pageable: boolean | PagerSettings;
  constructor(public readonly gridComponent: GridComponent) {}

  ngOnInit(): void {
    this.gridComponent.reorderable = true;
    this.gridComponent.resizable = true;
    this.gridComponent.filterable = 'menu';
    this.gridComponent.sortable = {
      allowUnsort: true,
      mode: 'multiple',
    };
    this.gridComponent.navigable = true;
    this.gridComponent.pageable = this.pageable || {
      info: true,
      type: 'numeric',
      pageSizes: [5, 10, 20, 50, 100], //NOSONAR
    };
    this.allSubscriptions.push(
      this.gridComponent.dataStateChange.subscribe(
        (t: ODataGridStateChangeEvent) => {
          this.gridComponent.sort = this.arrayComponent.state.sort =
            t.sort || [];
          this.gridComponent.pageSize = this.arrayComponent.state.take = t.take;
          this.gridComponent.skip = this.arrayComponent.state.skip = t.skip;
          this.arrayComponent.dataStateChange(t);
          this.arrayComponent.markForCheck();
        }
      ),
      this.gridComponent.pageChange.subscribe((t: PageChangeEvent) => {
        this.arrayComponent.pageChange(t);
      }),
      this.gridComponent.sortChange.subscribe((t: SortDescriptor[]) => {
        this.arrayComponent.sortChange(t);
      }),
      this.gridComponent.filterChange.subscribe(
        (t: CompositeFilterDescriptor) => {
          this.gridComponent.filter = this.arrayComponent.state.filter = t;
          this.arrayComponent.markForCheck();
          this.arrayComponent.filterChange(t);
        }
      ),
      this.arrayComponent.gridData$.subscribe((t) => {
        this.gridComponent.data = t;
      })
    );

    this.gridComponent.pageSize = this.arrayComponent.state.take || 20;
    this.gridComponent.filter = this.arrayComponent.state.filter || {
      logic: 'and',
      filters: [],
    };
    this.gridComponent.skip = this.arrayComponent.state.skip || 0;
    this.gridComponent.sort = this.arrayComponent.state.sort || [];
    this.gridComponent.data = this.arrayComponent.gridData;
    this.arrayComponent.hasHiddenColumns$ =
      this.gridComponent.columnVisibilityChange.pipe(
        hasHiddenColumns(this.gridComponent)
      );
  }

  ngAfterViewInit(): void {
    this.arrayComponent.markForCheck();
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}

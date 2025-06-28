import {
  Directive,
  Input,
  OnInit,
  OnDestroy,
  AfterViewInit,
  inject,
} from '@angular/core';
import {
  GridComponent,
  PageChangeEvent,
  PagerSettings,
} from '@progress/kendo-angular-grid';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';
import { GridStateChangeEvent, hasHiddenColumns } from 'imng-kendo-grid';
import { KendoArrayBasedComponent } from './kendo-array-base-component';
import {
  CompositeFilterDescriptor,
  SortDescriptor,
} from '@progress/kendo-data-query';

@Directive({
  selector: '[imngArrayGrid]',
  standalone: false,
})
export class ImngArrayGridDirective
  implements OnInit, AfterViewInit, OnDestroy, Subscribable
{
  readonly gridComponent = inject(GridComponent);

  public readonly allSubscriptions = new Subscriptions();
  @Input('imngArrayGrid') public arrayComponent?: KendoArrayBasedComponent<
    object,
    object
  >;
  @Input() public pageable: boolean | PagerSettings = true;

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
        (t: GridStateChangeEvent) => {
          this.gridComponent.sort = t.sort || [];
          this.gridComponent.pageSize = t.take;
          this.gridComponent.skip = t.skip;
          if (this.arrayComponent?.state) {
            this.arrayComponent.state = t;
            this.arrayComponent.dataStateChange(t);
            this.arrayComponent.markForCheck();
          }
        },
      ),
      this.gridComponent.pageChange.subscribe((t: PageChangeEvent) => {
        this.arrayComponent?.pageChange(t);
      }),
      this.gridComponent.sortChange.subscribe((t: SortDescriptor[]) => {
        this.arrayComponent?.sortChange(t);
      }),
      this.gridComponent.filterChange.subscribe(
        (t: CompositeFilterDescriptor) => {
          this.gridComponent.filter = t;
          if (this.arrayComponent) {
            this.arrayComponent.state.filter = t;
            this.arrayComponent.markForCheck();
            this.arrayComponent.filterChange(t);
          }
        },
      ),
      this.arrayComponent?.gridData$.subscribe((t) => {
        this.gridComponent.data = t;
      }),
    );

    this.gridComponent.pageSize = this.arrayComponent?.state.take || 20; //NOSONAR
    this.gridComponent.filter = this.arrayComponent?.state.filter || {
      logic: 'and',
      filters: [],
    };
    this.gridComponent.skip = this.arrayComponent?.state.skip ?? 0;
    this.gridComponent.sort = this.arrayComponent?.state.sort || [];
    this.gridComponent.data = this.arrayComponent?.gridData || [];
    if (this.arrayComponent) {
      this.arrayComponent.hasHiddenColumns$ =
        this.gridComponent.columnVisibilityChange.pipe(
          hasHiddenColumns(this.gridComponent),
        );
    }
  }

  ngAfterViewInit(): void {
    this.arrayComponent?.markForCheck();
  }

  ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}

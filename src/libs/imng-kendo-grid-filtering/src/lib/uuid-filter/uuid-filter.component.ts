import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
} from '@angular/core';
import { ColumnComponent, FilterService } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor } from '@progress/kendo-data-query';
import { Subscriptions } from 'imng-ngrx-utils';

/**
 * How To Use:
 * <kendo-grid-column ...>
 *  <ng-template kendoGridFilterMenuTemplate let-filter>
      <imng-uuid-filter [filter]="filter"></imng-uuid-filter>
    </ng-template>
   <kendo-grid-column>
 */
@Component({
  selector: 'imng-uuid-filter',
  template: `
    <kendo-grid-string-filter-menu
      [column]="column"
      [filter]="filter"
      [filterService]="filterService"
      [extra]="false"
      operator="eq">
      <kendo-filter-eq-operator />
    </kendo-grid-string-filter-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UuidFilterComponent {
  filterService = inject<FilterService>(FilterService);
  column = inject<ColumnComponent>(ColumnComponent);

  /**
   * The current menu filter.
   * @type {CompositeFilterDescriptor}
   */
  @Input()
  filter: CompositeFilterDescriptor;

  public allSubscriptions = new Subscriptions();
  constructor() {
    this.filter = null as never;
  }
}

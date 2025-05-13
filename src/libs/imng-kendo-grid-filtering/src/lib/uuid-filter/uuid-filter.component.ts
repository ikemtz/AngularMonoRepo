import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Inject,
} from '@angular/core';
import {
  ColumnComponent,
  FilterService,
  KENDO_GRID,
} from '@progress/kendo-angular-grid';
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
  imports: [KENDO_GRID],
  template: `
    <kendo-grid-string-filter-menu
      [column]="column"
      [filter]="filter"
      [filterService]="filterService"
      [extra]="false"
      operator="eq">
      <kendo-filter-eq-operator></kendo-filter-eq-operator>
    </kendo-grid-string-filter-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UuidFilterComponent {
  /**
   * The current menu filter.
   * @type {CompositeFilterDescriptor}
   */
  @Input()
  filter: CompositeFilterDescriptor;

  public allSubscriptions = new Subscriptions();
  constructor(
    @Inject(FilterService) public filterService: FilterService,
    @Inject(ColumnComponent) public column: ColumnComponent,
  ) {
    this.filter = null as never;
  }
}

import { EventEmitter } from '@angular/core';
import {
  ColumnVisibilityChangeEvent,
  DataStateChangeEvent,
  FilterableSettings,
  PageChangeEvent,
  SortSettings,
} from '@progress/kendo-angular-grid';
import {
  CompositeFilterDescriptor,
  DataResult,
  SortDescriptor,
} from '@progress/kendo-data-query';

export class MockGridComponent {
  public dataStateChange = new EventEmitter<DataStateChangeEvent>(false);
  public pageChange = new EventEmitter<PageChangeEvent>(false);
  public sortChange = new EventEmitter<Array<SortDescriptor>>(false);
  public filterChange = new EventEmitter<CompositeFilterDescriptor>(false);
  public columnVisibilityChange = new EventEmitter<ColumnVisibilityChangeEvent>(
    false
  );
  public data: never[] | DataResult = { total: 0, data: [] };
  public reorderable = true;
  public resizable = true;
  public navigable = true;
  public loading = false;
  public filterable: FilterableSettings = 'menu';
  public sortable: SortSettings = {
    allowUnsort: true,
    mode: 'multiple',
  };
}

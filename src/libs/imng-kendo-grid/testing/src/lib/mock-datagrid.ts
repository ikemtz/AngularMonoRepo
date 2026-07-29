import { Component, EventEmitter } from '@angular/core';
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
import { of } from 'rxjs';
import { ICompositeFilter } from 'imng-odata-client';

@Component({
  selector: 'imng-mock-grid',
  template: '',
})
export class MockGridComponent {
  public readonly facade = {
    loading$: of(false),
    gridData$: of({ total: 0, data: [] }),
    gridPagerSettings$: of(false),
    gridODataState$: of({}),
  };
  public dataStateChange = new EventEmitter<DataStateChangeEvent>(false);
  public pageChange = new EventEmitter<PageChangeEvent>(false);
  public sortChange = new EventEmitter<Array<SortDescriptor>>(false);
  public filterChange = new EventEmitter<
    CompositeFilterDescriptor | ICompositeFilter
  >(false);
  public columnVisibilityChange = new EventEmitter<ColumnVisibilityChangeEvent>(
    false,
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

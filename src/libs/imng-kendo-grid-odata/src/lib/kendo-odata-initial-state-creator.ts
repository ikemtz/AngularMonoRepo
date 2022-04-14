import { KendoODataGridState } from './kendo-odata-grid-state';

export function createKendoODataGridInitialState<TEntity>(): KendoODataGridState<TEntity> {
  return {
    gridData: { data: [], total: 0 },
    loading: false,
    gridODataState: {},
    gridPagerSettings: false,
    error: undefined
  };
}

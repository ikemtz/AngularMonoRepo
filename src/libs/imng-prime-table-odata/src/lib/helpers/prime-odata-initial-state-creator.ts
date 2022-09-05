import { PrimeODataTableState } from '../models/prime-odata-table-state';

export function createPrimeODataGridInitialState<
  TEntity,
>(): PrimeODataTableState<TEntity> {
  return {
    gridData: [],
    totalRecordCount: 0,
    loading: true,
    gridState: {},
    error: undefined,
  };
}

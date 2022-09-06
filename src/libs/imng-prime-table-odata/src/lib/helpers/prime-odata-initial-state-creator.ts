import { PrimeODataTableState } from '../models/prime-odata-table-state';

export function createPrimeODataGridInitialState<
  TEntity,
>(): PrimeODataTableState<TEntity> {
  return {
    tableData: [],
    totalRecordCount: 0,
    loading: true,
    tableState: {},
    error: undefined,
  };
}

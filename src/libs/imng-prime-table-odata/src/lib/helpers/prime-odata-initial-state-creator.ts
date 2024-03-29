import { PrimeODataTableState } from '../models/prime-odata-table-state';

export function createPrimeODataTableInitialState<
  TEntity,
>(): PrimeODataTableState<TEntity> {
  return {
    tableData: [],
    totalRecordCount: 0,
    activeEffectCount: 0,
    tableState: {},
    error: undefined,
  };
}

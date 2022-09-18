import { PrimeTableState } from './prime-table-state';

export interface PrimeODataTableState<Entity> {
  tableData: Array<Entity>;
  totalRecordCount: number | undefined;
  activeEffectCount: number;
  tableState: PrimeTableState;
  /** Last known error (if any) */
  error: unknown | undefined;
}

import { Observable } from 'rxjs';
import { PrimeTableState } from './models/prime-odata-table-state';

export interface IPrimeODataTableFacade<Entity extends { id?: string | null }> {
  loading$: Observable<boolean>;
  tableState$: Observable<PrimeTableState>;
  tableData$: Observable<Entity[]>;
  totalRecordCount$: Observable<number | undefined>;
  loadEntities(primeTableState: PrimeTableState): void;
  reloadEntities(primeTableState?: PrimeTableState): void;
}

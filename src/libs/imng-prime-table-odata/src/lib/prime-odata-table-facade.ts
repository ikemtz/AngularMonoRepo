import { IdType } from 'imng-nrsrx-client-utils';
import { Observable } from 'rxjs';
import { PrimeTableState } from './models/prime-table-state';

export interface IPrimeODataTableFacade<Entity extends { id?: IdType | null }> {
  activeEffectCount$: Observable<number>;
  tableState$: Observable<PrimeTableState>;
  tableData$: Observable<Entity[]>;
  totalRecordCount$: Observable<number | undefined>;
  loadEntities(primeTableState: PrimeTableState): void;
  reloadEntities(primeTableState?: PrimeTableState): void;
}

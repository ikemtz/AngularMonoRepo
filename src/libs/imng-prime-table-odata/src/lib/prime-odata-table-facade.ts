import { ODataQuery } from 'imng-odata-client';
import { Observable } from 'rxjs';

export interface IPrimeODataTableFacade<Entity extends { id?: string | null }> {
  loading$: Observable<boolean>;
  tableODataQueryState$: Observable<ODataQuery | undefined>;
  tableData$: Observable<Entity[]>;
  totalRecordCount$: Observable<number>;
  loadEntities(query: ODataQuery): void;
  reloadEntities(query?: ODataQuery): void;
}

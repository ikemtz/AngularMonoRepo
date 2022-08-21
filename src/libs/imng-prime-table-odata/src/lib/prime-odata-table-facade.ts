import { Observable } from 'rxjs';
import { ODataState } from 'imng-kendo-odata';

export interface IPrimeODataTableFacade<Entity extends { id?: string | null; }> {
  loading$: Observable<boolean>;
  tableODataQueryState$: Observable<ODataState | undefined>;
  tableData$: Observable<Entity[]>;
  totalRecordCount$: Observable<number>;
  loadEntities(state: ODataState): void;
  reloadEntities(state?: ODataState): void;
}
import { ODataGridDataResult } from './odata-grid-data-result';
import { ODataGridState } from './odata-grid-state';


export interface KendoODataState<Entity> {
  dataResult: ODataGridDataResult<Entity>;
  currentEntity?: Entity;
  loading: boolean;
  gridODataState?: ODataGridState;
  error?: any; // last known error (if any)
}

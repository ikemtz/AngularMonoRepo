import { ODataResult, ODataState } from 'imng-kendo-odata';

export interface KendoODataState<Entity> {
  dataResult: ODataResult<Entity>;
  currentEntity?: Entity;
  loading: boolean;
  gridODataState?: ODataState;
  error?: any; // last known error (if any)
}

import { ODataResult, ODataState } from 'imng-kendo-odata';

export interface KendoODataGridState<Entity> {
  gridData: ODataResult<Entity>;
  loading: boolean;
  gridODataState?: ODataState;
  error?: any; // last known error (if any)
}

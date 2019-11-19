import { ODataResult, ODataState } from 'imng-kendo-odata';
import { PagerSettings } from '@progress/kendo-angular-grid';

export interface KendoODataGridState<Entity> {
  gridData: ODataResult<Entity>;
  loading: boolean;
  gridODataState?: ODataState;
  error?: any; // last known error (if any)
  gridPagerSettings: PagerSettings | false;
}

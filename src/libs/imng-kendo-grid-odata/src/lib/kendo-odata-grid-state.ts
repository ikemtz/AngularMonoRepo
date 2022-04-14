import { ODataResult, ODataState } from 'imng-kendo-odata';
import { PagerSettings } from '@progress/kendo-angular-grid';

export interface KendoODataGridState<Entity> {
  gridData: ODataResult<Entity>;
  loading: boolean;
  gridODataState: ODataState;
  /** Last known error (if any) */
  error: unknown | undefined;
  gridPagerSettings: PagerSettings | false;
}

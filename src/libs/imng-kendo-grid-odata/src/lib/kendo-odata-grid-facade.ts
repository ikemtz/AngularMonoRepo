import { Observable } from 'rxjs';
import { ODataState, ODataResult } from 'imng-kendo-odata';
import { PagerSettings } from '@progress/kendo-angular-grid';

export interface IKendoODataGridFacade<Entity> {
  loading$: Observable<boolean>;
  gridODataState$: Observable<ODataState | undefined>;
  gridData$: Observable<ODataResult<Entity> | undefined>;
  gridPagerSettings$: Observable<false | PagerSettings>;
  loadEntities(state: ODataState): void;
  reloadEntities(state?: ODataState): void;
}

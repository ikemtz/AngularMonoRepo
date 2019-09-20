import { ODataGridState, ODataGridDataResult } from '..';
import { Observable, of } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';

export class KendoODataTestFacade {
  loading$: Observable<boolean> = of(false);
  gridODataState$: Observable<ODataGridState> = of({});
  gridDataResult$: Observable<ODataGridDataResult<object>> = of({ data: [], total: 0 });
  gridPagerSettings$: Observable<false | PagerSettings> = of(false);

  public loadEntities(state: ODataGridState): void {}
}

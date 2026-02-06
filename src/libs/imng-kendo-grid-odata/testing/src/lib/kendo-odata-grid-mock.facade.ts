/* istanbul ignore file */
import { jest } from '@jest/globals';
import { PagerSettings } from '@progress/kendo-angular-grid';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { Observable, of } from 'rxjs';

export class ODataGridMockFacade implements IKendoODataGridFacade<{
  id: string;
}> {
  public loading$: Observable<boolean> = of(false);
  public gridODataState$: Observable<ODataState> = of({});
  public gridData$: Observable<ODataResult<{ id: string }>> = of({
    data: [{ id: 'apples' }],
    total: 0,
  });
  public gridPagerSettings$: Observable<false | PagerSettings> = of({});
  public loadEntities = jest.fn();
  public reloadEntities = jest.fn();
}

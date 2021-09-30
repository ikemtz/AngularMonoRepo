import { Observable, of } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { ODataState, ODataResult } from 'imng-kendo-odata';
import { IKendoODataGridFacade } from '../../src';

export class ODataGridMockFacade implements IKendoODataGridFacade<object> {
  public loading$: Observable<boolean> = of(false);
  public gridODataState$: Observable<ODataState> = of({});
  public gridData$: Observable<ODataResult<object>> = of({ data: [], total: 0 });
  public gridPagerSettings$: Observable<false | PagerSettings> = of({});
  public loadEntities = jest.fn((state: ODataState) => { });
  public reloadEntities = jest.fn(() => { });
}

export function createODataGridMockFacade(mockFacade?: ODataGridMockFacade | any): ODataGridMockFacade {
  const localFacade = new ODataGridMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.loading$ = mockFacade.loading$ || localFacade.loading$;
  mockFacade.gridODataState$ = mockFacade.gridODataState$ || localFacade.gridODataState$;
  mockFacade.gridPagerSettings$ = mockFacade.gridPagerSettings$ || localFacade.gridPagerSettings$;
  mockFacade.loadEntities = mockFacade.loadEntities || jest.fn((x) => { });
  mockFacade.reloadEntities = mockFacade.reloadEntities || jest.fn((x) => { });
  return mockFacade;
}

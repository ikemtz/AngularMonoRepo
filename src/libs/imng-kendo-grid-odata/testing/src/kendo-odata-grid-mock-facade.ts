import { Observable, of } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { ODataState, ODataResult } from 'imng-kendo-odata';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';

export class KendoODataGridMockFacade implements IKendoODataGridFacade<object> {
  public loading$: Observable<boolean> = of(false);
  public gridODataState$: Observable<ODataState> = of({});
  public gridData$: Observable<ODataResult<object>> = of({ data: [], total: 0 });
  public gridPagerSettings$: Observable<false | PagerSettings> = of({});
  public loadEntities(state: ODataState): void {}
}

export function createKendoODataGridMockFacade(mockFacade?: KendoODataGridMockFacade | any): KendoODataGridMockFacade {
  const localFacade = new KendoODataGridMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  return {
    ...mockFacade,
    loading$: mockFacade.loading$ || localFacade.loading$,
    loadEntities: mockFacade.loadEntities || localFacade.loadEntities,
    gridODataState$: mockFacade.gridODataState$ || localFacade.gridODataState$,
    gridDataResult$: mockFacade.gridData$ || localFacade.gridData$,
    gridPagerSettings$: mockFacade.gridPagerSettings$ || localFacade.gridPagerSettings$,
  };
}

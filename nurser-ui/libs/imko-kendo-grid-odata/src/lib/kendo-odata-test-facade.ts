import { Observable, of } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { ODataState, ODataResult } from 'imng-kendo-odata';

export class KendoODataTestFacade {
  public loading$: Observable<boolean> = of(false);
  public gridODataState$: Observable<ODataState> = of({});
  public gridDataResult$: Observable<ODataResult<object>> = of({ data: [], total: 0 });
  public gridPagerSettings$: Observable<false | PagerSettings> = of({});

  public static create(mockFacade?: KendoODataTestFacade | any): KendoODataTestFacade {
    const localFacade = new KendoODataTestFacade();
    if (!mockFacade) {
      return localFacade;
    }
    return {
      ...mockFacade,
      loading$: mockFacade.loading$ || localFacade.loading$,
      loadEntities: mockFacade.loadEntities || localFacade.loadEntities,
      gridODataState$: mockFacade.gridODataState$ || localFacade.gridODataState$,
      gridDataResult$: mockFacade.gridDataResult$ || localFacade.gridDataResult$,
      gridPagerSettings$: mockFacade.gridPagerSettings$ || localFacade.gridPagerSettings$,
    };
  }

  public loadEntities(state: ODataState): void {}
}

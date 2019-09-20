import { ODataGridState, ODataGridDataResult } from '..';
import { Observable, of } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';

export class KendoODataTestFacade {
  public loading$: Observable<boolean> = of(false);
  public gridODataState$: Observable<ODataGridState> = of({});
  public gridDataResult$: Observable<ODataGridDataResult<object>> = of({ data: [], total: 0 });
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

  public loadEntities(state: ODataGridState): void {}
}

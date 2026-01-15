/* istanbul ignore file */
import { ODataGridMockFacade } from './kendo-odata-grid-mock.facade';

export function createODataGridMockFacade(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockFacade?: ODataGridMockFacade | any,
): ODataGridMockFacade {
  const localFacade = new ODataGridMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.loading$ = mockFacade.loading$ || localFacade.loading$;
  mockFacade.gridODataState$ =
    mockFacade.gridODataState$ || localFacade.gridODataState$;
  mockFacade.gridData$ = mockFacade.gridData$ || localFacade.gridData$;
  mockFacade.gridPagerSettings$ =
    mockFacade.gridPagerSettings$ || localFacade.gridPagerSettings$;
  mockFacade.loadEntities =
    mockFacade.loadEntities ||
    jest.fn(() => {
      //This is intentional
    });
  mockFacade.reloadEntities =
    mockFacade.reloadEntities ||
    jest.fn(() => {
      //This is intentional
    });
  return mockFacade;
}

/* istanbul ignore file */
import { ODataTableMockFacade } from './prime-odata-table-mock.facade';

export function createODataGridMockFacade(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockFacade?: ODataTableMockFacade | any
): ODataTableMockFacade {
  const localFacade = new ODataTableMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.loading$ = mockFacade.loading$ || localFacade.loading$;
  mockFacade.tableODataQueryState$ =
    mockFacade.tableODataQueryState$ || localFacade.tableODataQueryState$;
  mockFacade.gridPagerSettings$ =
    mockFacade.gridPagerSettings$ || localFacade.gridPagerSettings$;
  mockFacade.totalRecordCount$ =
    mockFacade.totalRecordCount$ || localFacade.totalRecordCount$;
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

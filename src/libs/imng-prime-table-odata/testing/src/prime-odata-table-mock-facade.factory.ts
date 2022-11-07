/* istanbul ignore file */
import { ODataTableMockFacade } from './prime-odata-table-mock.facade';

export function createODataTableMockFacade(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockFacade?: ODataTableMockFacade | any,
): ODataTableMockFacade {
  const localFacade = new ODataTableMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.tableData$ = mockFacade.tableData$ || localFacade.tableData$;
  mockFacade.activeEffectCount$ =
    mockFacade.activeEffectCount$ || localFacade.activeEffectCount$;
  mockFacade.tableState$ = mockFacade.tableState$ || localFacade.tableState$;
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

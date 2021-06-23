// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IDataDeleteFacade } from 'imng-kendo-data-entry';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DataDeleteMockFacade implements IDataDeleteFacade<any> {
  deleteExistingEntity = jest.fn();
}

// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
export function createDataDeleteMockFacade(mockFacade?: IDataDeleteFacade<object> | any): IDataDeleteFacade<object> {
  const localFacade = new DataDeleteMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.deleteExistingEntity = mockFacade.deleteExistingEntity || jest.fn();
  return mockFacade;
}

import { IDataDeleteFacade } from 'imng-kendo-data-entry';

export class DataDeleteMockFacade implements IDataDeleteFacade<any> {
  deleteExistingEntity = jest.fn();
}

export function createDataDeleteMockFacade(mockFacade?: IDataDeleteFacade<object> | any): IDataDeleteFacade<object> {
  const localFacade = new DataDeleteMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.deleteExistingEntity = mockFacade.deleteExistingEntity || jest.fn();
  return mockFacade;
}

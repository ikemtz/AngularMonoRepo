// eslint-disable-next-line @nx/enforce-module-boundaries
import { IDataDeleteFacade } from 'imng-kendo-data-entry';

export class DataDeleteMockFacade implements IDataDeleteFacade<unknown> {
  deleteExistingEntity = jest.fn();
}

export function createDataDeleteMockFacade<T = unknown>(
  mockFacade?: T,
): T & IDataDeleteFacade<unknown> {
  if (!mockFacade) {
    return new DataDeleteMockFacade() as T & IDataDeleteFacade<unknown>;
  }
  (
    mockFacade as unknown as { deleteExistingEntity: () => void }
  ).deleteExistingEntity =
    (mockFacade as unknown as { deleteExistingEntity: () => void })
      .deleteExistingEntity || jest.fn();
  return mockFacade as T & IDataDeleteFacade<unknown>;
}

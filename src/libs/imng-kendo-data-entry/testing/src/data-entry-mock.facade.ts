import { jest } from '@jest/globals';
import { Observable, of } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IDataEntryFacade } from 'imng-kendo-data-entry';

export class DataEntryMockFacade implements IDataEntryFacade<unknown> {
  public loading$: Observable<boolean> = of(false);
  public currentEntity$: Observable<unknown> = of({});
  public currentModalState$?: Observable<string | undefined> = of('');
  public isEditActive$: Observable<boolean> = of(false);
  public isNewActive$: Observable<boolean> = of(false);
  public setCurrentEntity = jest.fn();
  public clearCurrentEntity = jest.fn();
  public saveNewEntity = jest.fn();
  public updateExistingEntity = jest.fn();
}

export function createDataEntryMockFacade(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockFacade?: IDataEntryFacade<unknown> | any, //NOSONAR
): IDataEntryFacade<unknown> {
  const localFacade = new DataEntryMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.loading$ = mockFacade.loading$ || localFacade.loading$;
  mockFacade.currentEntity$ =
    mockFacade.currentEntity$ || localFacade.currentEntity$;
  mockFacade.isEditActive$ =
    mockFacade.isEditActive$ || localFacade.isEditActive$;
  mockFacade.isNewActive$ = mockFacade.isNewActive$ || localFacade.isNewActive$;
  mockFacade.setCurrentEntity = mockFacade.setCurrentEntity || jest.fn();
  mockFacade.clearCurrentEntity = mockFacade.clearCurrentEntity || jest.fn();
  mockFacade.saveNewEntity = mockFacade.saveNewEntity || jest.fn();
  mockFacade.updateExistingEntity =
    mockFacade.updateExistingEntity || jest.fn();
  return mockFacade;
}

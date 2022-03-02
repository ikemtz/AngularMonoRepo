import { Observable, of } from 'rxjs';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IDataEntryFacade } from 'imng-kendo-data-entry';

// eslint-disable-next-line @typescript-eslint/ban-types
export class DataEntryMockFacade implements IDataEntryFacade<object> {
  public loading$: Observable<boolean> = of(false);
  // eslint-disable-next-line @typescript-eslint/ban-types
  public currentEntity$: Observable<object> = of({});
  public isEditActive$: Observable<boolean> = of(false);
  public isNewActive$: Observable<boolean> = of(false);
  public setCurrentEntity = jest.fn();
  public clearCurrentEntity = jest.fn();
  public saveNewEntity = jest.fn();
  public updateExistingEntity = jest.fn();
}

// eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-explicit-any
export function createDataEntryMockFacade(mockFacade?: IDataEntryFacade<object> | any): IDataEntryFacade<object> {
  const localFacade = new DataEntryMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.loading$ = mockFacade.loading$ || localFacade.loading$;
  mockFacade.currentEntity$ = mockFacade.currentEntity$ || localFacade.currentEntity$;
  mockFacade.isEditActive$ = mockFacade.isEditActive$ || localFacade.isEditActive$;
  mockFacade.isNewActive$ = mockFacade.isNewActive$ || localFacade.isNewActive$;
  mockFacade.setCurrentEntity = mockFacade.setCurrentEntity || jest.fn();
  mockFacade.clearCurrentEntity = mockFacade.clearCurrentEntity || jest.fn();
  mockFacade.saveNewEntity = mockFacade.saveNewEntity || jest.fn();
  mockFacade.updateExistingEntity = mockFacade.updateExistingEntity || jest.fn();
  return mockFacade;
}

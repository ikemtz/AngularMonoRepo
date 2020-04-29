import { Observable, of } from 'rxjs';
import { IDataEntryFacade } from 'imng-kendo-data-entry';

export class DataEntryMockFacade implements IDataEntryFacade<object> {
  public loading$: Observable<boolean> = of(false);
  public currentEntity$: Observable<object> = of(null);
  public isEditActive$: Observable<boolean> = of(false);
  public isNewActive$: Observable<boolean> = of(false);
  public setCurrentEntity = () => jest.fn();
  public clearCurrentEntity = () => jest.fn();
  public saveNewEntity = (entity: object) => jest.fn();
  public updateExistingEntity = (entity: object) => jest.fn();
}

export function createDataEntryMockFacade(mockFacade?: IDataEntryFacade<object> | any): IDataEntryFacade<object> {
  const localFacade = new DataEntryMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.loading$ = mockFacade.loading$ || localFacade.loading$;
  mockFacade.currentEntity$ = mockFacade.currentEntity$ || localFacade.currentEntity$;
  mockFacade.isEditActive$ = mockFacade.isEditActive$ || localFacade.isEditActive$;
  mockFacade.isNewActive$ = mockFacade.isNewActive$ || localFacade.isNewActive$;
  mockFacade.setCurrentEntity = mockFacade.setCurrentEntity || jest.fn(() => {});
  mockFacade.clearCurrentEntity = mockFacade.clearCurrentEntity || jest.fn(() => {});
  mockFacade.saveNewEntity = mockFacade.saveNewEntity || jest.fn(() => {});
  mockFacade.updateExistingEntity = mockFacade.updateExistingEntity || jest.fn(() => {});
  return mockFacade;
}

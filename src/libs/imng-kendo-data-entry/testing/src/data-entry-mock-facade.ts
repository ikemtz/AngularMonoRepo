import { Observable, of } from 'rxjs';
import { IDataEntryFacade } from 'imng-kendo-data-entry';

export class DataEntryMockFacade implements IDataEntryFacade<object> {
  public loading$: Observable<boolean> = of(false);
  public currentEntity$: Observable<object> = of(null);
  public isEditActive$: Observable<boolean> = of(false);
  public isNewActive$: Observable<boolean> = of(false);
  public setCurrentEntity(entity: object): void {}
  public clearCurrentEntity(): void {}
  public saveNewEntity(entity: object): void {}
  public updateExistingEntity(entity: object): void {}
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
  mockFacade.setCurrentEntity = mockFacade.setCurrentEntity || localFacade.setCurrentEntity;
  mockFacade.clearCurrentEntity = mockFacade.clearCurrentEntity || localFacade.clearCurrentEntity;
  mockFacade.saveNewEntity = mockFacade.saveNewEntity || localFacade.saveNewEntity;
  mockFacade.updateExistingEntity = mockFacade.updateExistingEntity || localFacade.updateExistingEntity;
  return mockFacade;
}

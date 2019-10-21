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
  return {
    ...mockFacade,
    loading$: mockFacade.loading$ || localFacade.loading$,
    currentEntity$: mockFacade.currentEntity$ || localFacade.currentEntity$,
    isEditActive$: mockFacade.isEditActive$ || localFacade.isEditActive$,
    isNewActive$: mockFacade.isNewActive$ || localFacade.isNewActive$,
    setCurrentEntity: mockFacade.setCurrentEntity || localFacade.setCurrentEntity,
    clearCurrentEntity: mockFacade.clearCurrentEntity || localFacade.clearCurrentEntity,
    saveNewEntity: mockFacade.saveNewEntity || localFacade.saveNewEntity,
    updateExistingEntity: mockFacade.updateExistingEntity || localFacade.updateExistingEntity,
  };
}

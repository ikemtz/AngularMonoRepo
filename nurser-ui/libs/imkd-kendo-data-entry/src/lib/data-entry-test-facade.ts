import { DataEntryFacade } from '..';
import { Observable, of } from 'rxjs';

export class DataEntryTestFacade implements DataEntryFacade<object> {
  public loading$: Observable<boolean> = of(false);
  public currentEntity$: Observable<object> = of(null);
  public isEditActive$: Observable<boolean> = of(false);
  public isNewActive$: Observable<boolean> = of(false);

  public static create(mockFacade?: DataEntryFacade<object> | any): DataEntryFacade<object> {
    const localFacade = new DataEntryTestFacade();
    if (!mockFacade) {
      return localFacade;
    }
    return {
      ...mockFacade,
      loading$: mockFacade.loading$ || localFacade.loading$,
      currentEntity$: mockFacade.currentEntity$ || localFacade.currentEntity$,
      isEditActive$: mockFacade.isEditActive$ || localFacade.isEditActive$,
      isNewActive$: mockFacade.isNewActive$ || localFacade.isNewActive$,
      clearCurrentEntity: mockFacade.clearCurrentEntity || localFacade.clearCurrentEntity,
      saveNewEntity: mockFacade.saveNewEntity || localFacade.saveNewEntity,
      updateExistingEntity: mockFacade.updateExistingEntity || localFacade.updateExistingEntity,
    };
  }

  public clearCurrentEntity(): void {}
  public saveNewEntity(entity: object): void {}
  public updateExistingEntity(entity: object): void {}
}

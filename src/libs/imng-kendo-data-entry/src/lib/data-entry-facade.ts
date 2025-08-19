import { map, Observable, of } from 'rxjs';

export interface IDataEntryFacade<Entity> extends IBaseDataEntryFacade {
  currentEntity$: Observable<Entity | undefined>;
  currentModalState$?: Observable<string | undefined>;
  setCurrentEntity(
    entity: Entity,
    modalState?: string,
    parentEntity?: unknown,
  ): void;
  saveNewEntity(entity: Entity): void;
  updateExistingEntity(entity: Entity): void;
}

export interface IBaseDataEntryFacade {
  loading$: Observable<boolean>;
  clearCurrentEntity(): void;
}
export function isModalState(facade: IDataEntryFacade<unknown>, expectedModalState: string): Observable<boolean> {
  return facade.currentModalState$?.pipe(
    map((currentModalState) => currentModalState === expectedModalState)
  ) || of(false);
}

import { Observable } from 'rxjs';

export interface IDataEntryFacade<Entity> extends IBaseDataEntryFacade {
  currentEntity$: Observable<Entity | undefined>;
  setCurrentEntity(entity: Entity, parentEntity?: unknown): void;
  saveNewEntity(entity: Entity): void;
  updateExistingEntity(entity: Entity): void;
}

export interface IBaseDataEntryFacade {
  loading$: Observable<boolean>;
  isEditActive$: Observable<boolean>;
  isNewActive$: Observable<boolean>;
  clearCurrentEntity(): void;
}

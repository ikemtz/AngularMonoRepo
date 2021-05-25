import { Observable } from 'rxjs';

export interface IDataEntryFacade<Entity> extends IDataEntryComponentFacade { 
  currentEntity$: Observable<Entity>;
  setCurrentEntity(entity: Entity, parentEntity?: unknown): void;
  saveNewEntity(entity: Entity): void;
  updateExistingEntity(entity: Entity): void;
}

export interface IDataEntryComponentFacade  {
  loading$: Observable<boolean>; 
  isEditActive$: Observable<boolean>;
  isNewActive$: Observable<boolean>; 
  clearCurrentEntity(): void; 
}
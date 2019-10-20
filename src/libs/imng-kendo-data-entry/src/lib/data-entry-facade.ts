import { Observable } from 'rxjs';

export interface IDataEntryFacade<Entity> {
    loading$: Observable<boolean>;
    currentEntity$: Observable<Entity>;
    isEditActive$: Observable<boolean>;
    isNewActive$: Observable<boolean>;
    clearCurrentEntity(): void;
    saveNewEntity(entity: Entity): void;
    updateExistingEntity(entity: Entity): void;
}
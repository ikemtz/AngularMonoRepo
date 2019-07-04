import { Observable } from 'rxjs';

export interface DataEntryFacade<Entity> {
    loading$: Observable<boolean>;
    currentEntity$: Observable<Entity>;
    isEditActive$: Observable<boolean>;
    isNewActive$: Observable<boolean>;
    clearCurrentEntity(): void;
    saveNewEntity(entity: Entity): void;
    setCurrentEntity(entity: Entity): void;
    updateExistingEntity(entity: Entity): void;
}
import { Observable } from 'rxjs';

export interface DataEntryFacade<Entity> {
    loading$: Observable<boolean>;
    currentEntity$: Observable<Entity>;
    isActive$: Observable<boolean>;
    clearCurrentEntity(): void;
    saveNewEntity(entity: Entity): void;
    setCurrentEntity(entity: Entity): void;
    updateExistingEntity(entity: Entity): void;
}
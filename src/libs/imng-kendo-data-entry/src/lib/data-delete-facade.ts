export interface IDataDeleteFacade<Entity> {
  setCurrentEntity(
    entity: Entity,
    modalState?: string,
    parentEntity?: unknown,
  ): void;
  deleteExistingEntity(entity: Entity): void;
}

export interface IDataDeleteFacade<Entity> {
  deleteExistingEntity(entity: Entity): void;
}

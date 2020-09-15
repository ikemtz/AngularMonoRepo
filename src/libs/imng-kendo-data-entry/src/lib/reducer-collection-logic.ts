export function updateStateCollectionItem<Entity extends { id?: string | number | Date; }>(
  collection: Entity[],
  item: Entity,
): Entity[] {
  const items = [...collection];
  const index = collection.indexOf(collection.find(val => val.id === item.id));
  items.splice(index, 1, item);
  return items;
}

export function removeStateCollectionItem<Entity extends { id?: string | number | Date; }>(
  collection: Entity[],
  item: Entity,
): Entity[] {
  const items = [...collection];
  const index = collection.indexOf(collection.find(val => val.id === item.id));
  items.splice(index, 1);
  return items;
}

export function addStateCollectionItem<Entity extends { id?: string | number | Date; }>(collection: Entity[], item: Entity): Entity[] {
  const items = [...collection];
  items.unshift(item);
  return items;
}

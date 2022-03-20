import { ValueType } from 'imng-nrsrx-client-utils';
export function updateStateCollectionItem<Entity extends { id?: ValueType }>(
  collection: Entity[],
  item: Entity
): Entity[] {
  const items = [...collection];
  const index = collection.findIndex((val) => val.id === item.id);
  items.splice(index, 1, item);
  return items;
}

export function removeStateCollectionItem<Entity extends { id?: ValueType }>(
  collection: Entity[],
  item: Entity
): Entity[] {
  const items = [...collection];
  const index = collection.findIndex((val) => val.id === item.id);
  items.splice(index, 1);
  return items;
}

export function addStateCollectionItem<Entity extends { id?: ValueType }>(
  collection: Entity[],
  item: Entity
): Entity[] {
  const items = [...collection];
  items.unshift(item);
  return items;
}

import { ValueType } from 'imng-nrsrx-client-utils';
export function updateStateCollectionItem<Entity extends { id?: ValueType; }>(
  collection: Entity[],
  item: Entity
): Entity[] {
  const index = collection.findIndex((val) => val.id === item.id);
  if (index > -1) {
    const items = [...collection];
    items.splice(index, 1, item);
    return items;
  }
  return collection;
}

export function removeStateCollectionItem<Entity extends { id?: ValueType; }>(
  collection: Entity[],
  item: Entity
): Entity[] {
  const index = collection.findIndex((val) => val.id === item.id);
  if (index > -1) {
    const items = [...collection];
    items.splice(index, 1);
    return items;
  }
  return collection;
}

export function addStateCollectionItem<Entity extends { id?: ValueType; }>(
  collection: Entity[],
  item: Entity
): Entity[] {
  const items = [...collection];
  items.unshift(item);
  return items;
}

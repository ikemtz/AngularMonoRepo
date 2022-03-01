import { ValueType } from 'imng-nrsrx-client-utils';
export function updateStateCollectionItem<Entity extends { id?: ValueType }>(
  collection: Entity[],
  item: Entity,
): Entity[] {
  const items = [...collection];
  const index = collection.indexOf(collection.find((val) => val?.id === item?.id) || ({} as Entity));
  if (index > -1) {
    items.splice(index, 1, item);
  }
  return items;
}

export function removeStateCollectionItem<Entity extends { id?: ValueType }>(
  collection: Entity[],
  item: Entity,
): Entity[] {
  if (!item) {
    throw `item must have a value`;
  }
  const items = [...collection];
  const index = collection.indexOf(collection.find((val) => val?.id === item?.id) || ({} as Entity));
  if (index > -1) {
    items.splice(index, 1);
  }
  return items;
}

export function addStateCollectionItem<Entity extends { id?: ValueType }>(
  collection: Entity[],
  item: Entity,
): Entity[] {
  const items = [...collection];
  items.unshift(item);
  return items;
}

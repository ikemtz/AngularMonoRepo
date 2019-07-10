
export function updateStateCollection<Entity extends { id: string }>(collection: Entity[], item: Entity) {
    const items = [...collection];
    const index = collection.indexOf(collection.find(val => val.id === item.id));
    items.splice(index, 1, item);
    return items;
}
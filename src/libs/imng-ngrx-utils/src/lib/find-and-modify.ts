
export function findAndModify<ENTITY extends { id?: number | string | Date; }>(
  data: ENTITY[],
  lookupId: number | string,
  modificationLogic: (matchingRecord: ENTITY) => void): ENTITY[] {
  return [...data.map(m => m.id === lookupId ?
    applyChanges(m, modificationLogic)
    : m
  )];
}

function applyChanges<ENTITY>(record: ENTITY, modificationLogic: (matchingRecord: ENTITY) => void): ENTITY {
  const spreadRecord = { ...record };
  modificationLogic(spreadRecord);
  return spreadRecord;
}

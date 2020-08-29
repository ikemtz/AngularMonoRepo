export function findAndModify<ENTITY extends { id?: number | string; }>(
  data: ENTITY[],
  lookupId: number | string,
  replacementLogic: (matchingRecord: ENTITY) => void): ENTITY[] {
  return [...data.map(m => m.id === lookupId ?
    applyChanges(m, replacementLogic)
    : m
  )];
}

function applyChanges<ENTITY>(record: ENTITY, replacementLogic: (matchingRecord: ENTITY) => void): ENTITY {
  const spreadRecord = { ...record };
  replacementLogic(spreadRecord);
  return spreadRecord;
}

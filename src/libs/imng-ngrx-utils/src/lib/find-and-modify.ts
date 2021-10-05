import { idType } from './id-type';

export function findAndModify<ENTITY extends { id?: idType; }>(
  data: ENTITY[],
  lookupId: idType,
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

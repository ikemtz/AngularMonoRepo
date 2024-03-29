import { IdType } from 'imng-nrsrx-client-utils';

export function findAndModify<ENTITY extends { id?: IdType | null; }>(
  data: ENTITY[],
  lookupId: IdType | undefined,
  modificationLogic: (matchingRecord: ENTITY) => void,
): ENTITY[] {
  return [...data.map((m) => (m.id === lookupId ? applyChanges(m, modificationLogic) : m))];
}

function applyChanges<ENTITY>(record: ENTITY, modificationLogic: (matchingRecord: ENTITY) => void): ENTITY {
  const spreadRecord = { ...record };
  modificationLogic(spreadRecord);
  return spreadRecord;
}

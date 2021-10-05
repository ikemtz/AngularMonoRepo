import { idType } from './id-type';

export function findAndMerge<ENTITY extends { id?: idType; }, COLLECTION_ENTITY extends { id?: idType; }>(
  record: ENTITY,
  data: COLLECTION_ENTITY[]): ENTITY {
  return {
    ...data.find(f => f.id === record.id),
    ...record
  };
}

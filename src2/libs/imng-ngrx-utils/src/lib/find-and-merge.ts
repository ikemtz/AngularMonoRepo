import { IdType } from 'imng-nrsrx-client-utils';

export function findAndMerge<ENTITY extends { id?: IdType }, COLLECTION_ENTITY extends { id?: IdType }>(
  record: ENTITY,
  data: COLLECTION_ENTITY[],
): ENTITY {
  return {
    ...data.find((f) => f.id === record.id),
    ...record,
  };
}

export function findAndMerge<ENTITY extends { id?: number | string | Date; }, COLLECTION_ENTITY extends { id?: number | string | Date; }>(
  record: ENTITY,
  data: COLLECTION_ENTITY[]): ENTITY {
  return { 
    ...data.find(f => f.id === record.id), 
    ...record };
}
import { IdType } from 'imng-nrsrx-client-utils';

export function getById<T extends { id?: IdType; }>(
  source: { data: T[]; total: number; } | Array<T>,
  id: IdType,
): T | undefined {
  if (Array.isArray(source)) {
    return source.find((f) => f.id === id);
  }
  return source.data?.find((f) => f.id === id);
}

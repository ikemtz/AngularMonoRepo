import { IdType } from 'imng-nrsrx-client-utils';

export function removeById<T extends { id?: IdType }>(
  source: { data: T[]; total: number } | Array<T>,
  id: IdType,
): { data: T[]; total: number } | Array<T> {
  if (Array.isArray(source)) {
    const result = source;
    return result?.filter((f) => f.id !== id);
  } else {
    const data = source?.data?.filter((f) => f.id !== id);
    return {
      total: source.total + (data.length - source?.data?.length),
      data: data,
    };
  }
}

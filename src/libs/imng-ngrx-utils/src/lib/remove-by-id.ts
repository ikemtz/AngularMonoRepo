import { ODataResult, isODataResult } from 'imng-kendo-odata';

export function removeById<T extends { id?: string | number | Date }>(
  source: ODataResult<T> | Array<T>,
  id: string | number | Date,
): ODataResult<T> | Array<T> {
  if (isODataResult(source)) {
    const data = source?.data?.filter((f) => f.id !== id);
    return {
      total: source.total + (data.length - source?.data?.length),
      data: data,
    };
  } else {
    const result = source;
    return result?.filter((f) => f.id !== id);
  }
}

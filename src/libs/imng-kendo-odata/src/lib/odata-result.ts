import { DataResult } from '@progress/kendo-data-query';

export interface ODataResult<T> extends DataResult {
  data: Array<T>;
  total: number;
}
export const ODataResultEmpty: ODataResult<any> =
  { data: [], total: 0 };

export function createODataResult<T>(t: T[]): ODataResult<T> {
  return {
    data: t,
    total: t?.length,
  };
}

import { DataResult } from '@progress/kendo-data-query';
import { IdType } from 'imng-nrsrx-client-utils';

export interface ODataResult<T extends { id: IdType } | unknown> extends DataResult {
  data: Array<T>;
  total: number;
}
export const ODataResultEmpty: ODataResult<unknown> = { data: [], total: 0 };

export function createODataResult<T extends { id: IdType } | unknown>(t: T[]): ODataResult<T> {
  return {
    data: t,
    total: t?.length,
  };
}
export function isODataResult<T extends { id: IdType } | unknown>(source: unknown): source is ODataResult<T> {
  return !!(source as ODataResult<T>)?.data;
}

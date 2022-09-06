import { IdType } from 'imng-nrsrx-client-utils';

export interface ODataResult<T extends { id?: IdType } | unknown> {
  value: T[];
  count?: number;
  '@odata.count'?: number;
}

export function createEmptyODataResult<
  T extends { id?: IdType } | unknown,
>(): ODataResult<T> {
  return { value: Array<T>(), count: 0 };
}

export function isODataResult<T extends { id?: IdType } | unknown>(
  source: unknown,
): source is ODataResult<T> {
  return !!(source as ODataResult<T>)?.value;
}

import { IdType } from 'imng-nrsrx-client-utils';
import { ODataResult } from '../models/odata-result';

export function createODataResult<T extends { id?: IdType } | unknown>(
  t: T[],
): ODataResult<T> {
  return {
    value: t,
    count: t?.length,
  };
}

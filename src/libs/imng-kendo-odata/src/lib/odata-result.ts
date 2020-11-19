import { DataResult } from '@progress/kendo-data-query';

export interface ODataResult<T> extends DataResult {
  data: Array<T>;
  total: number;
}
export const ODataResultEmpty: ODataResult<any> =
  { data: [], total: 0 }; 

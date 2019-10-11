import { DataResult } from '@progress/kendo-data-query';

export interface ODataResult<T> extends DataResult {
  data: Array<T>;
  total: number;
}

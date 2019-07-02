import { GridDataResult } from '@progress/kendo-angular-grid';

export interface ODataGridDataResult<T> extends GridDataResult {
  data: Array<T>;
  total: number;
}

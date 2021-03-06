import { InFilter } from 'imng-kendo-odata';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

export interface ODataGridStateChangeEvent extends DataStateChangeEvent {
  expanders?: string[];
  selectors?: string[];
  inFilter?: InFilter;
  count?: boolean;
}

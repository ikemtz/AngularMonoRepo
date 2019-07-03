import { State } from '@progress/kendo-data-query';
import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

export interface ODataGridState extends State {
  expanders?: string[];
  selectors?: string[];
  inFilter?: InFilter;
  count?: boolean;
}

export interface ODataGridStateChangeEvent extends DataStateChangeEvent {
  expanders?: string[];
  selectors?: string[];
  inFilter?: InFilter;
  count?: boolean;
}

export interface InFilter {
  field: string,
  values: (string | number)[];
}

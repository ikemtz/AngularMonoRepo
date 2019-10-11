import { State } from '@progress/kendo-data-query';

export interface ODataState extends State {
  expanders?: string[];
  selectors?: string[];
  inFilter?: InFilter;
  count?: boolean;
}

export interface InFilter {
  field: string;
  values: (string | number)[];
}

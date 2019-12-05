import { State } from '@progress/kendo-data-query';

export interface ODataState extends State {
  expanders?: Array<Expander | string>;
  selectors?: string[];
  inFilter?: InFilter;
  count?: boolean;
}

export interface InFilter {
  field: string;
  values: (string | number)[];
}
export interface Expander {
  tableName: string;
  selectors?: string[];
}

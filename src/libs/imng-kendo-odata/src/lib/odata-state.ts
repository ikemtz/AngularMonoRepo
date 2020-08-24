import { State, FilterDescriptor } from '@progress/kendo-data-query';

export interface ODataState extends State {
  expanders?: Array<Expander | string>;
  selectors?: string[];
  inFilter?: InFilter;
  childFilter?: ChildFilterDescriptor;
  count?: boolean;
  transformations?: string;
}

export interface InFilter {
  field: string;
  values: (string | number)[];
}

export interface ChildFilterDescriptor extends FilterDescriptor {
  childTableNavigationProperty: string;
  linqOperation: 'all' | 'any';
}

export interface Expander {
  tableName: string;
  selectors?: string[];
}

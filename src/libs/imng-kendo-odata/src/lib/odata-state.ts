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
  /** This value will default to 'and' in cases where there are additional filters specified. */
  logic?: 'or' | 'and';
  field: string;
  values: (string | number)[];
}

export interface ChildFilterDescriptor extends FilterDescriptor {
  /**  This value will default to 'and' in cases where there are additional filters specified. */
  logic?: 'or' | 'and';
  childTableNavigationProperty: string;
  linqOperation: 'all' | 'any';
}

export interface Expander {
  tableName: string;
  selectors?: string[];
  expander?: string;
  filter?: string;
}

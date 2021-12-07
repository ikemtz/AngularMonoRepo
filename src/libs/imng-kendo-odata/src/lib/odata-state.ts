import { State, FilterDescriptor, CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { IdType } from 'imng-nrsrx-client-utils';

export interface ODataState extends State {
  expanders?: Array<Expander | string>;
  selectors?: string[];
  inFilters?: InFilter[];
  childFilters?: CompositeChildFilterDescriptor;
  count?: boolean;
  transformations?: string;
}

export interface InFilter {
  /** This value will default to 'and' in cases where there are additional filters specified. */
  logic?: 'or' | 'and';
  field: string;
  values: IdType[];
}

export interface CompositeChildFilterDescriptor extends CompositeFilterDescriptor {
  filters: Array<CompositeChildFilterDescriptor | ChildFilterDescriptor>;
}

export interface ChildFilterDescriptor extends FilterDescriptor {
  /**  This value will default to 'and' in cases where there are additional filters specified. */
  childTableNavigationProperty: string;
  linqOperation: 'all' | 'any';
}

export interface Expander {
  table: string;
  selectors?: string[];
  expander?: string | Expander;
  filter?: CompositeFilterDescriptor;
  sort?: Array<SortDescriptor>;
}
export function isExpander(source: string | Expander): source is Expander {
  return !!(source as Expander)?.table;
}

export function isCompositeChildFilterDescriptor(
  source: CompositeChildFilterDescriptor | ChildFilterDescriptor,
): source is CompositeChildFilterDescriptor {
  return !!(source as CompositeChildFilterDescriptor)?.filters;
}

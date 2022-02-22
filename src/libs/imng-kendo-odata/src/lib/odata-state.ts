import { State, FilterDescriptor, CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { IdType } from 'imng-nrsrx-client-utils';

export interface ODataState extends State {
  expanders?: Array<Expander | string>;
  selectors?: string[];
  inFilters?: InFilter[];
  childFilters?: CompositeChildFilterDescriptor;
  count?: boolean;
  transformations?: string;
  compute?: Array<Computation | string>;
}
export interface Computation {
  /** This can also be a static value */
  fieldA: string | number;
  /** This can also be a static value */
  fieldB: string | number;
  operator: 'mul' | 'div' | 'add' | 'sub' | 'mod' | string;
  /** This MUST differ from the names of declared or dynamic properties of the identified resources. */
  alias: string;
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
export function isComputation(source: string | Computation): source is Computation {
  return !!(source as Computation)?.operator;
}

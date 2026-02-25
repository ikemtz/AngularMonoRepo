import {
  FilterDescriptor,
  SortDescriptor,
  GroupDescriptor,
} from '@progress/kendo-data-query';
import { IdType } from 'imng-nrsrx-client-utils';
import { ICompositeFilter } from 'imng-odata-client';

export interface ODataState {
  /**
   * The number of records to be skipped by the pager.
   */
  skip?: number;
  /**
   * The number of records to take.
   */
  take?: number;
  /**
   * The descriptors used for sorting.
   */
  sort?: Array<SortDescriptor>;
  /**
   * The descriptors used for grouping.
   */
  group?: Array<GroupDescriptor>;
  expanders?: Array<Expander>;
  selectors?: string[];
  inFilters?: InFilter[];
  notInFilters?: InFilter[];
  childFilters?: CompositeChildFilterDescriptor;
  filter?: ICompositeFilter;
  count?: boolean;
  transformations?: string;
  compute?: Array<Computation | string>;
}
export interface Computation {
  /** This can also be a static value */
  fieldA: string | number;
  /** This can also be a static value */
  fieldB: string | number;
  operator: 'mul' | 'div' | 'add' | 'sub' | 'mod' | string; //NOSONAR
  /** This MUST differ from the names of declared or dynamic properties of the identified resources. */
  alias: string;
}

export interface InFilter {
  /** This value will default to 'and' in cases where there are additional filters specified. */
  logic?: 'or' | 'and';
  field: string;
  values: IdType[];
}

export interface CompositeChildFilterDescriptor {
  /**
   * The logical operation to use when the `filter.filters` option is set.
   *
   * The supported values are:
   * * `"and"`
   * * `"or"`
   */
  logic: 'or' | 'and';
  /**
   *
   */
  filters?: Array<CompositeChildFilterDescriptor | ChildFilterDescriptor>;
  existsFilters?: Array<ChildExistsFilterDescriptor>;
  /** This is used when combining the child filter with other filters on the parent.
   * If not specified it will default to 'and'.
   * Example: (childFilter) and (regularFilter)
   * Example: (childFilter) or (regularFilter)
   */
  externalLogic?: 'and' | 'or';
}
/** This is used to filter records that have child records that exists or match a filter.
 *  @See {@link https://docs.oasis-open.org/odata/odata/v4.0/errata03/os/complete/part2-url-conventions/odata-v4.0-errata03-os-part2-url-conventions-complete.html#_Toc371341806}
 */
export interface ChildExistsFilterDescriptor {
  /**  This should be the child table navigation property */
  childTableNavigationProperty: string;
  /** Filter expression to be used, this can be undefined
   * Example: 'childRecord:childRecord/Quantity gt 100'
   */
  filter?: string;
  /**
   * This should be 'any' or 'all' for child table navigation properties.
   * 'all' will return records if all child records match the filter.
   * 'any' will return records if any child record matches the filter.
   * @default 'any'
   * @note If 'all' is used a filter expression must be provided.
   */
  linqOperation?: 'all' | 'any';
}
export interface ChildFilterDescriptor extends FilterDescriptor {
  /**  This should be the child table navigation property */
  childTableNavigationProperty: string;
  /**
   * This should be 'any' or 'all' for child table navigation properties.
   * If this is not specified, it will default to 'any'.
   * 'all' will return records if all child records match the filter.
   * 'any' will return records if any child record matches the filter.
   */
  linqOperation: 'all' | 'any';
}

export interface Expander {
  table: string;
  selectors?: string[];
  expanders?: Array<Expander | string>;
  filter?: ICompositeFilter;
  sort?: Array<SortDescriptor>;
  count?: boolean;
}
export function isExpander(source: string | Expander): source is Expander {
  return !!(source as Expander)?.table;
}
export function isComputation(
  source: string | Computation,
): source is Computation {
  return !!(source as Computation)?.operator;
}

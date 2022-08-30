import { ChildFilter } from './child-filter';
import { Filter } from './filter';

/**
 * A complex filter expression.
 */
export interface CompositeFilter {
  /**
   * The logical operation to use when the `filter.filters` option is set.
   *
   * The supported values are:
   * * `"and"`
   * * `"or"`
   */
  logic: 'or' | 'and';
  /**
   * The nested filter expressions
   */
  filters: Array<Filter | ChildFilter | CompositeFilter>;
}

export function isCompositeFilter(
  source: CompositeFilter | Filter | ChildFilter,
): source is CompositeFilter {
  return !!(source as CompositeFilter)?.filters;
}

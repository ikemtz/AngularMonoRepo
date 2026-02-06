import { IChildFilter } from './child-filter';
import { IFilter } from './filter';

/**
 * A complex filter expression.
 */
export interface ICompositeFilter {
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
  filters: Array<IFilter | IChildFilter | ICompositeFilter>;
}

export function isCompositeFilter(
  source: ICompositeFilter | IFilter | IChildFilter,
): source is ICompositeFilter {
  return !!(source as ICompositeFilter)?.filters;
}

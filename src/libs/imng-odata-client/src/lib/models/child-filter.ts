import { CompositeFilter } from './composite-filter';
import { Filter } from './filter';

export interface ChildFilter extends Filter {
  /**
   * Used to support child entity filtering:
   * Child table name/navigation property
   * */
  childTable: string;
  /**
   * Used to support child entity filtering:
   * Specifies whether all or some of the child records have to match the given criteria
   * */
  linqOperation: 'all' | 'any';
}

export function isChildFilter(
  source: CompositeFilter | Filter | ChildFilter,
): source is ChildFilter {
  return !!(source as ChildFilter)?.childTable;
}

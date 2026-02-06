import { ICompositeFilter } from './composite-filter';
import { IFilter } from './filter';

export interface IChildFilter extends IFilter {
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
  source: ICompositeFilter | IFilter | IChildFilter,
): source is IChildFilter {
  return !!(source as IChildFilter)?.childTable;
}

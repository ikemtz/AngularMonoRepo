import { Computation, Expander } from 'imng-odata-client';
import { FilterMetadata, SortMeta } from 'primeng/api';

export interface PrimeTableState {
  first?: number;
  last?: number;
  rows?: number;
  multiSortMeta?: SortMeta[];
  globalFilter?: string[];

  filters?: {
    [s: string]: FilterMetadata[];
  };
  expand?: Array<Expander>;
  /**
   * Specifies the list of properties to retrieve
   */
  select?: string[];
  /**
   * Request a total count of records.
   * Note: Filter expressions will affect this value.
   * Default: true
   */
  count?: boolean;
  /**
   * Specifies aggregation behavior for the collection of entries.
   */
  apply?: string;
  /**
   * Specifies computed properties that can be used in $select, $filter or $orderby expressions.
   */
  compute?: Array<Computation | string>;
}

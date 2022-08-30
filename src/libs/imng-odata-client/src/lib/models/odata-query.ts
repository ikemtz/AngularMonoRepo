import { CompositeFilter } from './composite-filter';
import { Computation } from './computation';
import { Expander } from './expander';
import { Sort } from './sort';

export interface ODataQuery {
  /**
   * The number of records to be skipped by the pager.
   */
  skip?: number;
  /**
   * The number of records to take.
   */
  top?: number;
  /**
   * The descriptors used for sorting.
   */
  orderBy?: Array<Sort>;
  /**
   * The descriptors used for filtering.
   */
  filter?: CompositeFilter;
  /**
   * Used to specify the retrieval of related tables/entities.
   */
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

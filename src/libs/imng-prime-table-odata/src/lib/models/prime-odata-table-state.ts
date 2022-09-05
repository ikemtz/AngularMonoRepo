import { Computation, Expander } from 'imng-odata-client';
import { LazyLoadEvent } from 'primeng/api';

export interface PrimeODataTableState<Entity> {
  gridData: Array<Entity>;
  totalRecordCount: number | undefined;
  loading: boolean;
  gridState: PrimeTableState;
  /** Last known error (if any) */
  error: unknown | undefined;
}
export interface PrimeTableState extends LazyLoadEvent {
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

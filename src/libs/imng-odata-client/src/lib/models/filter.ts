import { IdType } from 'imng-nrsrx-client-utils';
import { IFilterOperator } from './filter-operator';
import { ICompositeFilter } from './composite-filter';
import { IChildFilter } from './child-filter';

/**
 * A basic filter expression.
 */
export interface IFilter {
  /**
   * The data item field to which the filter operator is applied.
   */
  field: string;
  /**
   * The filter operator (comparison).
   *
   * The supported operators are:
   * * `FilterOperators.equalTo` (equal to)
   * * `FilterOperators.notEqualTo` (not equal to)
   * * `FilterOperators.isNull` (is equal to null)
   * * `FilterOperators.notNull` (is not equal to null)
   * * `FilterOperators.lessThan` (less than)
   * * `FilterOperators.lessThanOrEqualTo` (less than or equal to)
   * * `FilterOperators.greaterThan` (greater than)
   * * `FilterOperators.greaterThanOrEqualTo` (greater than or equal to)
   * * `FilterOperators.in` (specified value should be an array)
   * * `FilterOperators.notIn` (specified value should be an array)
   *
   * The following operators are supported for string fields only:
   * * `FilterOperators.startsWith`
   * * `FilterOperators.endsWith`
   * * `FilterOperators.contains`
   * * `FilterOperators.notContains`
   * * `FilterOperators.isEmpty`
   * * `FilterOperators.notempty`
   */
  operator: IFilterOperator | string;
  /**
   * The value to which the field is compared. Has to be of the same type as the field.
   */
  value?: IdType | IdType[] | boolean | null;
  /**
   * Determines if the string comparison is case-insensitive.
   */
  ignoreCase?: boolean;
}

export function isFilter(
  source: ICompositeFilter | IFilter | IChildFilter | string,
): source is IFilter {
  return !!(source as IFilter)?.field;
}

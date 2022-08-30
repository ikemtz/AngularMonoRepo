import { IdType } from 'imng-nrsrx-client-utils';

/**
 * A basic filter expression.
 */
export interface Filter {
  /**
   * The data item field to which the filter operator is applied.
   */
  field: string;
  /**
   * The filter operator (comparison).
   *
   * The supported operators are:
   * * `"eq"` (equal to)
   * * `"ne"` (not equal to)
   * * `"isnull"` (is equal to null)
   * * `"isnotnull"` (is not equal to null)
   * * `"lt"` (less than)
   * * `"le"` (less than or equal to)
   * * `"gt"` (greater than)
   * * `"ge"` (greater than or equal to)
   * * `"in"` (specified value should be an array)
   * * `"notin"` (specified value should be an array)
   *
   * The following operators are supported for string fields only:
   * * `"startswith"`
   * * `"endswith"`
   * * `"contains"`
   * * `"doesnotcontain"`
   * * `"isempty"`
   * * `"isnotempty"`
   */
  operator:
    | ((field: string, value: IdType) => string)
    | ((field: string, value: IdType[]) => string)
    | ((field: string, value?: IdType | IdType[] | undefined) => string);
  /**
   * The value to which the field is compared. Has to be of the same type as the field.
   */
  value?: IdType | IdType[];
  /**
   * Determines if the string comparison is case-insensitive.
   */
  ignoreCase?: boolean;
}

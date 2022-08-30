import { IdType } from 'imng-nrsrx-client-utils';
import {
  serializeArrayFilter,
  serializeFunctionFilter,
  serializeSimpleFilter,
} from './filter-serializers';

/**
 * Represents the list of supported simple filter operators.
 */
export class FilterOperators {
  /**
   * The `eq` operator.
   */
  public static readonly EqualTo = (field: string, value: IdType): string =>
    serializeSimpleFilter(field, 'eq', value);
  /**
   * The `gt` operator.
   */
  public static readonly GreaterThan = (field: string, value: IdType): string =>
    serializeSimpleFilter(field, 'gt', value);
  /**
   * The `ge` operator.
   */
  public static readonly GreaterThanOrEqual = (
    field: string,
    value: IdType,
  ): string => serializeSimpleFilter(field, 'ge', value);
  /**
   * The `lt` operator.
   */
  public static readonly LessThan = (field: string, value: IdType): string =>
    serializeSimpleFilter(field, 'lt', value);
  /**
   * The `le` operator.
   */
  public static readonly LessThanOrEqual = (
    field: string,
    value: IdType,
  ): string => serializeSimpleFilter(field, 'le', value);
  /**
   * The `ne` operator.
   */
  public static readonly NotEqualTo = (field: string, value: IdType): string =>
    serializeSimpleFilter(field, 'ne', value);
  /**
   * The `in` operator.
   */
  public static readonly In = (field: string, values: IdType[]): string =>
    serializeArrayFilter(field, 'in', values);
  /**
   * The `in` operator.
   */
  public static readonly NotIn = (field: string, values: IdType[]): string =>
    serializeArrayFilter(field, 'not in', values);
  /**
   * The `isnotnull` operator.
   */

  public static readonly IsNotNull = (field: string): string =>
    `${field} ne null`;
  /**
   * The `isnull` operator.
   */

  public static readonly IsNull = (field: string): string => `${field} eq null`;
  /**
   * The `contains` operator.
   */
  public static readonly Contains = (field: string, value: IdType): string =>
    serializeFunctionFilter(field, 'contains', value);
  /**
   * The `doesnotcontain` operator.
   */
  public static readonly DoesNotContain = (
    field: string,
    value: IdType,
  ): string => serializeFunctionFilter(field, 'not contains', value);
  /**
   * The `endswith` operator.
   */
  public static readonly EndsWith = (field: string, value: IdType): string =>
    serializeFunctionFilter(field, 'endswith', value);
  /**
   * The `doesnotendwith` operator.
   */
  public static readonly DoesNotEndWith = (
    field: string,
    value: IdType,
  ): string => serializeFunctionFilter(field, 'not endswith', value);
  /**
   * The `startswith` operator.
   */
  public static readonly StartsWith = (field: string, value: IdType): string =>
    serializeFunctionFilter(field, 'startswith', value);
  /**
   * The `doesnotstartwith` operator.
   */
  public static readonly DoesNotStartWith = (
    field: string,
    value: IdType,
  ): string => serializeFunctionFilter(field, 'not startswith', value);
  /**
   * The `isempty` operator.
   */

  public static readonly IsEmpty = (field: string): string =>
    serializeSimpleFilter(field, 'eq', '');
  /**
   * The `isnotempty` operator.
   */

  public static readonly IsNotEmpty = (field: string): string =>
    serializeSimpleFilter(field, 'ne', '');
}

import { IdType } from 'imng-nrsrx-client-utils';
import { IFilterOperator } from './filter-operator';
import {
  serializeArrayFilter,
  serializeFunctionFilter,
  serializeSimpleFilter,
} from '../helpers/filter-serializers';

export interface IFilterOperators {
  [key: string]: IFilterOperator;
}

/**
 * Represents the list of supported simple filter operators.
 */
export class FilterOperators {
  /**
   * The `eq` operator.
   */
  public static readonly equals: IFilterOperator = {
    name: 'equals',
    toODataString: (field: string, value?: IdType) =>
      serializeSimpleFilter(field, 'eq', value),
  };
  /**
   * The `gt` operator.
   */
  public static readonly greaterThan: IFilterOperator = {
    name: 'greaterThan',
    toODataString: (field: string, value?: IdType): string =>
      serializeSimpleFilter(field, 'gt', value),
  };
  /**
   * The `ge` operator.
   */
  public static readonly greaterThanOrEquals: IFilterOperator = {
    name: 'greaterThanOrEquals',
    toODataString: (field: string, value?: IdType): string =>
      serializeSimpleFilter(field, 'ge', value),
  };
  /**
   * The `lt` operator.
   */
  public static readonly lessThan: IFilterOperator = {
    name: 'lessThan',
    toODataString: (field: string, value?: IdType): string =>
      serializeSimpleFilter(field, 'lt', value),
  };
  /**
   * The `le` operator.
   */
  public static readonly lessThanOrEquals: IFilterOperator = {
    name: 'lessThanOrEquals',
    toODataString: (field: string, value?: IdType): string =>
      serializeSimpleFilter(field, 'le', value),
  };
  /**
   * The `ne` operator.
   */
  public static readonly notEquals: IFilterOperator = {
    name: 'notEquals',
    toODataString: (field: string, value?: IdType): string =>
      serializeSimpleFilter(field, 'ne', value),
  };
  /**
   * The `in` operator.
   */
  public static readonly in: IFilterOperator = {
    name: 'in',
    toODataString: (field: string, values?: IdType[]): string =>
      serializeArrayFilter(field, 'in', values),
  };
  /**
   * The `not in` operator.
   */
  public static readonly notIn: IFilterOperator = {
    name: 'notIn',
    toODataString: (field: string, values?: IdType[]): string =>
      serializeArrayFilter(field, 'not in', values),
  };
  /**
   * The `is not null` operator.
   */

  public static readonly notNull: IFilterOperator = {
    name: 'notNull',
    toODataString: (field: string): string => `${field} ne null`,
  };
  /**
   * The `is null` operator.
   */
  public static readonly isNull: IFilterOperator = {
    name: 'isNull',
    toODataString: (field: string): string => `${field} eq null`,
  };
  /**
   * The `contains` operator.
   */
  public static readonly contains: IFilterOperator = {
    name: 'contains',
    toODataString: (field: string, value?: IdType): string =>
      serializeFunctionFilter(field, 'contains', value),
  };
  /**
   * The `not contain` operator.
   */
  public static readonly notContains: IFilterOperator = {
    name: 'notContains',
    toODataString: (field: string, value?: IdType): string =>
      serializeFunctionFilter(field, 'not contains', value),
  };
  /**
   * The `ends with` operator.
   */
  public static readonly endsWith: IFilterOperator = {
    name: 'endswith',
    toODataString: (field: string, value?: IdType): string =>
      serializeFunctionFilter(field, 'endswith', value),
  };
  /**
   * The `not ends with` operator.
   */
  public static readonly notEndsWith: IFilterOperator = {
    name: 'notEndsWith',
    toODataString: (field: string, value?: IdType): string =>
      serializeFunctionFilter(field, 'not endswith', value),
  };
  /**
   * The `startswith` operator.
   */
  public static readonly startsWith: IFilterOperator = {
    name: 'startsWith',
    toODataString: (field: string, value?: IdType): string =>
      serializeFunctionFilter(field, 'startswith', value),
  };
  /**
   * The `not start with` operator.
   */
  public static readonly notStartsWith: IFilterOperator = {
    name: 'notStartsWith',
    toODataString: (field: string, value?: IdType): string =>
      serializeFunctionFilter(field, 'not startswith', value),
  };
  /**
   * The `empty` operator.
   */
  public static readonly isEmpty: IFilterOperator = {
    name: 'isEmpty',
    toODataString: (field: string): string =>
      serializeSimpleFilter(field, 'eq', ''),
  };
  /**
   * The `not empty` operator.
   */
  public static readonly notEmpty: IFilterOperator = {
    name: 'notEmpty',
    toODataString: (field: string): string =>
      serializeSimpleFilter(field, 'ne', ''),
  };
}

export const filterOperators: IFilterOperators = {
  contains: FilterOperators.contains,
  endsWith: FilterOperators.endsWith,
  equals: FilterOperators.equals,
  eq: FilterOperators.equals,
  dateIs: FilterOperators.equals,
  greaterThan: FilterOperators.greaterThan,
  gt: FilterOperators.greaterThan,
  dateAfter: FilterOperators.greaterThan,
  greaterThanOrEquals: FilterOperators.greaterThanOrEquals,
  ge: FilterOperators.greaterThanOrEquals,
  in: FilterOperators.in,
  isEmpty: FilterOperators.isEmpty,
  isNull: FilterOperators.isNull,
  lessThan: FilterOperators.lessThan,
  lt: FilterOperators.lessThan,
  dateBefore: FilterOperators.lessThan,
  lessThanOrEquals: FilterOperators.lessThanOrEquals,
  lte: FilterOperators.lessThan,
  notContains: FilterOperators.notContains,
  notEmpty: FilterOperators.notEmpty,
  notEndsWith: FilterOperators.notEndsWith,
  notEquals: FilterOperators.notEquals,
  dateIsNot: FilterOperators.notEquals,
  notIn: FilterOperators.notIn,
  notNull: FilterOperators.notNull,
  notStartsWith: FilterOperators.notStartsWith,
  startsWith: FilterOperators.startsWith,
};

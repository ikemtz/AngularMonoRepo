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
    toODataString: (field: string, value?: IdType, isRelativeValue = false) =>
      serializeSimpleFilter(field, 'eq', value, isRelativeValue),
  };
  /**
   * The `gt` operator.
   */
  public static readonly greaterThan: IFilterOperator = {
    name: 'greaterThan',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string => serializeSimpleFilter(field, 'gt', value, isRelativeValue),
  };
  /**
   * The `ge` operator.
   */
  public static readonly greaterThanOrEquals: IFilterOperator = {
    name: 'greaterThanOrEquals',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string => serializeSimpleFilter(field, 'ge', value, isRelativeValue),
  };
  /**
   * The `lt` operator.
   */
  public static readonly lessThan: IFilterOperator = {
    name: 'lessThan',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string => serializeSimpleFilter(field, 'lt', value, isRelativeValue),
  };
  /**
   * The `le` operator.
   */
  public static readonly lessThanOrEquals: IFilterOperator = {
    name: 'lessThanOrEquals',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string => serializeSimpleFilter(field, 'le', value, isRelativeValue),
  };
  /**
   * The `ne` operator.
   */
  public static readonly notEquals: IFilterOperator = {
    name: 'notEquals',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string => serializeSimpleFilter(field, 'ne', value, isRelativeValue),
  };
  /**
   * The `in` operator.
   */
  public static readonly in: IFilterOperator = {
    name: 'in',
    toODataString: (
      field: string,
      values?: IdType[],
      isRelativeValue = false,
    ): string => serializeArrayFilter(field, 'in', values, isRelativeValue),
  };
  /**
   * The `not in` operator.
   */
  public static readonly notIn: IFilterOperator = {
    name: 'notIn',
    toODataString: (
      field: string,
      values?: IdType[],
      isRelativeValue = false,
    ): string => serializeArrayFilter(field, 'not in', values, isRelativeValue),
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
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string =>
      serializeFunctionFilter(field, 'contains', value, isRelativeValue),
  };
  /**
   * The `not contain` operator.
   */
  public static readonly notContains: IFilterOperator = {
    name: 'notContains',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string =>
      serializeFunctionFilter(field, 'not contains', value, isRelativeValue),
  };
  /**
   * The `ends with` operator.
   */
  public static readonly endsWith: IFilterOperator = {
    name: 'endswith',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string =>
      serializeFunctionFilter(field, 'endswith', value, isRelativeValue),
  };
  /**
   * The `not ends with` operator.
   */
  public static readonly notEndsWith: IFilterOperator = {
    name: 'notEndsWith',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string =>
      serializeFunctionFilter(field, 'not endswith', value, isRelativeValue),
  };
  /**
   * The `startswith` operator.
   */
  public static readonly startsWith: IFilterOperator = {
    name: 'startsWith',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string =>
      serializeFunctionFilter(field, 'startswith', value, isRelativeValue),
  };
  /**
   * The `not start with` operator.
   */
  public static readonly notStartsWith: IFilterOperator = {
    name: 'notStartsWith',
    toODataString: (
      field: string,
      value?: IdType,
      isRelativeValue = false,
    ): string =>
      serializeFunctionFilter(field, 'not startswith', value, isRelativeValue),
  };
  /**
   * The `empty` operator.
   */
  public static readonly isEmpty: IFilterOperator = {
    name: 'isEmpty',
    toODataString: (field: string): string =>
      serializeSimpleFilter(field, 'eq', '', false),
  };
  /**
   * The `not empty` operator.
   */
  public static readonly notEmpty: IFilterOperator = {
    name: 'notEmpty',
    toODataString: (field: string): string =>
      serializeSimpleFilter(field, 'ne', '', false),
  };
}

export const filterOperators: IFilterOperators = {
  contains: FilterOperators.contains,
  endsWith: FilterOperators.endsWith,
  endswith: FilterOperators.endsWith,
  equals: FilterOperators.equals,
  eq: FilterOperators.equals,
  dateIs: FilterOperators.equals,
  greaterThan: FilterOperators.greaterThan,
  gt: FilterOperators.greaterThan,
  dateAfter: FilterOperators.greaterThan,
  greaterThanOrEquals: FilterOperators.greaterThanOrEquals,
  gte: FilterOperators.greaterThanOrEquals,
  ge: FilterOperators.greaterThanOrEquals,
  in: FilterOperators.in,
  isEmpty: FilterOperators.isEmpty,
  isNull: FilterOperators.isNull,
  isnull: FilterOperators.isNull,
  lessThan: FilterOperators.lessThan,
  lt: FilterOperators.lessThan,
  dateBefore: FilterOperators.lessThan,
  lessThanOrEquals: FilterOperators.lessThanOrEquals,
  lte: FilterOperators.lessThanOrEquals,
  notContains: FilterOperators.notContains,
  doesnotcontain: FilterOperators.notContains,
  notEmpty: FilterOperators.notEmpty,
  isnotempty: FilterOperators.notEmpty,
  notEndsWith: FilterOperators.notEndsWith,
  notEquals: FilterOperators.notEquals,
  ne: FilterOperators.notEquals,
  neq: FilterOperators.notEquals,
  dateIsNot: FilterOperators.notEquals,
  notIn: FilterOperators.notIn,
  notNull: FilterOperators.notNull,
  isnotnull: FilterOperators.notNull,
  notStartsWith: FilterOperators.notStartsWith,
  startsWith: FilterOperators.startsWith,
  startswith: FilterOperators.startsWith,
};

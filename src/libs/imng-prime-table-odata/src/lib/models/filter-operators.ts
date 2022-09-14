import { FilterOperators, IFilterOperators } from 'imng-odata-client';

export const primeFilterOperators: IFilterOperators = {
  contains: FilterOperators.contains,
  endsWith: FilterOperators.endsWith,
  equals: FilterOperators.equals,
  dateIs: FilterOperators.equals,
  gt: FilterOperators.greaterThan,
  dateAfter: FilterOperators.greaterThan,
  gte: FilterOperators.greaterThanOrEquals,
  in: FilterOperators.in,
  isEmpty: FilterOperators.isEmpty,
  isNull: FilterOperators.isNull,
  lt: FilterOperators.lessThan,
  dateBefore: FilterOperators.lessThan,
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
import { IdType } from 'imng-nrsrx-client-utils';

export function serializeValue(
  value?: IdType,
  isRelativeValue = false,
): string {
  if (isRelativeValue) {
    return value?.toString() ?? '';
  } else if (typeof value === 'string') {
    return `'${value}'`;
  } else if (value instanceof Date) {
    return `${value.toISOString().split('T')[0]}`;
  }
  return `${value}`;
}

export const serializeSimpleFilter = (
  field: string,
  operator: string,
  value?: IdType,
  isRelativeValue = false,
): string => `${field} ${operator} ${serializeValue(value, isRelativeValue)}`;

export const serializeArrayFilter = (
  field: string,
  operator: string,
  values?: IdType[],
  isRelativeValue = false,
): string =>
  values && values.length > 0
    ? `${field} ${operator} (${values.map((value) => serializeValue(value, isRelativeValue)).join(',')})`
    : '';

export const serializeFunctionFilter = (
  field: string,
  func: string,
  value?: IdType,
  isRelativeValue = false,
): string =>
  value ? `${func}(${field},${serializeValue(value, isRelativeValue)})` : '';

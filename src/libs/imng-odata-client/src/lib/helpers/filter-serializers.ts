import { IdType } from 'imng-nrsrx-client-utils';

export function serializeValue(
  isRelativeValue: boolean,
  value?: IdType,
): string {
  if (typeof value === 'string') {
    return isRelativeValue ? value : `'${value}'`;
  }
  return value instanceof Date
    ? `${value.toISOString().split('T')[0]}`
    : `${value}`;
}

export const serializeSimpleFilter = (
  field: string,
  operator: string,
  isRelativeValue: boolean,
  value?: IdType,
): string => `${field} ${operator} ${serializeValue(isRelativeValue, value)}`;

export const serializeArrayFilter = (
  field: string,
  operator: string,
  isRelativeValue: boolean,
  values?: IdType[],
): string =>
  values && values.length > 0
    ? `${field} ${operator} (${values.map((m) => serializeValue(isRelativeValue, m)).join(',')})`
    : '';

export const serializeFunctionFilter = (
  field: string,
  func: string,
  isRelativeValue: boolean,
  value?: IdType,
): string =>
  value ? `${func}(${field},${serializeValue(isRelativeValue, value)})` : '';

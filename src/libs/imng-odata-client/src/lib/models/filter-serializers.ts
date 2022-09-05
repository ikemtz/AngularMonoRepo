import { IdType } from 'imng-nrsrx-client-utils';

export const serializeValue = (value: IdType): string =>
  typeof value === 'string'
    ? `'${value}'`
    : value instanceof Date
    ? `${value.toISOString().split('T')[0]}`
    : `${value}`;

export const serializeSimpleFilter = (
  field: string,
  operator: string,
  value?: IdType,
): string => (value ? `${field}+${operator}+${serializeValue(value)}` : '');

export const serializeArrayFilter = (
  field: string,
  operator: string,
  values?: IdType[],
): string =>
  values
    ? `${field}+${operator}+(${values.map((m) => serializeValue(m)).join(',')})`
    : '';

export const serializeFunctionFilter = (
  field: string,
  func: string,
  value?: IdType,
): string => (value ? `${func}(${field},${serializeValue(value)})` : '');

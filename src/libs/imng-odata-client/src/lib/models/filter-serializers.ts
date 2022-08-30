import { IdType } from 'imng-nrsrx-client-utils';

export const serializeValue = (value: IdType): string =>
  typeof value === 'string' ? `'${value}'` : `${value}`;

export const serializeSimpleFilter = (
  field: string,
  operator: string,
  value: IdType,
): string => `${field} ${operator} ${serializeValue(value)}`;

export const serializeArrayFilter = (
  field: string,
  operator: string,
  values: IdType[],
): string =>
  `${field} ${operator} (${values.map((m) => serializeValue(m)).join(',')})`;

export const serializeFunctionFilter = (
  field: string,
  func: string,
  value: IdType,
): string => `${func}(${field},${serializeValue(value)})`;

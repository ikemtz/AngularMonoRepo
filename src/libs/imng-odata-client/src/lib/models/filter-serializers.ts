import { IdType } from 'imng-nrsrx-client-utils';

export const serializeValue = (value: IdType): string =>
  typeof value === 'string' ? `'${value}'` : `${value}`;

export const serializeSimpleFilter = (
  field: string,
  operator: string,
  value: IdType,
): string => `${field} ${operator} ${serializeValue(value)}`;

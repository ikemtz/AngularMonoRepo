export type IdType = number | string | Date | undefined;

export function isaNumber(value: unknown): value is number {
  const type = typeof value;
  return type === 'number' || type === 'bigint';
}

export function isaString(value: unknown): value is string {
  return typeof value === 'string';
}
export function isaDate(value: unknown): value is Date {
  return value instanceof Date;
}

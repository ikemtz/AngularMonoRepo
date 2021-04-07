export function isaNumber(value: unknown): boolean {
  const type = typeof (value);
  return type === 'number' || type === 'bigint';
}

export function isaString(value: unknown): boolean {
  return typeof (value) === 'string';
}
export function isaDate(value: unknown): boolean {
  return value instanceof Date;
}

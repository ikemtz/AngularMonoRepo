export function toDateOnly(date?: Date): string | undefined {
  return date?.toISOString().split('T')[0];
}

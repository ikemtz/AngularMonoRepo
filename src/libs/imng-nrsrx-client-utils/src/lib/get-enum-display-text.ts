export function getEnumDisplayText(
  values: { key: number; name: string; displayText: string }[],
  value: string | number,
): string | undefined {
  return values.find((t) => t.name === value || t.key === value)?.displayText;
}

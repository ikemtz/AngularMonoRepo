/**
 *   Summary: This will update an object to make all properties with empty string values have null values instead.
 * @usageNotes
 * Only use this method with plain objects.
 **/
export function normalizeRequest<T>(payload: T): T {
  for (const x in payload) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload[x] = ((payload[x] as any).toString() === '' ? null : payload[x]) as any;
  }
  return payload;
}

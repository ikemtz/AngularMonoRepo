import { isaString } from './id-type';
/**
 *   Summary: This will update an object to make all properties with empty string values have null values instead.
 * @usageNotes
 * Only use this method with plain objects.
**/

// eslint-disable-next-line @typescript-eslint/ban-types
export function normalizeRequest<T extends object>(payload: T): T {
  for (const x in payload) {
    const val: unknown = payload[x];
    if ((isaString(val) && !val.length) ||
      (Array.isArray(val) && !val.length)) {
      payload[x] = null as never;
    }
  }
  return payload;
}

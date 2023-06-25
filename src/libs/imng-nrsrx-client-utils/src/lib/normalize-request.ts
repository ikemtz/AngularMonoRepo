import { isaString } from './id-type';
/**
 *   Summary: This will update an object to make all properties with empty string values have null values instead.
 * @usageNotes
 * Only use this method with plain objects.
 **/

// eslint-disable-next-line @typescript-eslint/ban-types
export function normalizeRequest<T extends object>(payload: T): T {
  payload = { ...payload };
  for (const x in payload) {
    let val: unknown = payload[x];
    if (isaString(val)) {
      payload[x] = val = val?.trim() as never;
    }
    if (
      (isaString(val) && !val.length) ||
      (Array.isArray(val) && !val.length)
    ) {
      payload[x] = null as never;
    }
  }
  return payload;
}

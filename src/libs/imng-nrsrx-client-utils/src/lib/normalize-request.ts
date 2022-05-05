import { isaString } from './id-type';
/**
 *   Summary: This will update an object to make all properties with empty string values have null values instead.
 * @usageNotes
 * Only use this method with plain objects.
**/

// eslint-disable-next-line @typescript-eslint/ban-types
export function normalizeRequest<T extends object>(payload: T): T {
  for (const x in payload) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const val: any = payload[x];
    if (isaString(val)) {
      const newLocal = val.toString() === ''; //NOSONAR
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload[x] = (newLocal ? null : payload[x]) as any; //NOSONAR
    }
  }
  return payload;
}

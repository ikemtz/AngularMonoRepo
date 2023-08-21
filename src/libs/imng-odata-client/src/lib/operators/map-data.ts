import { MILLI_SECS_PER_SEC } from 'imng-nrsrx-client-utils';
import { map } from 'rxjs/operators';
import { FetchOptions, ODataResult } from '../models';

export const mapData = <T extends object>(options: FetchOptions) =>
  map((response: ODataResult<T> | T[]): ODataResult<T> => {
    if (!response) {
      return { value: [], count: 0 };
    }
    return Array.isArray(response)
      ? {
          value: response,
          count: response.length,
        }
      : ({
          value: parseDatesInCollection(response.value, options),
          count: response['@odata.count'],
        } as ODataResult<T>);
  });

export function parseDatesInCollection<T extends object>(
  collection: Array<T>,
  options: FetchOptions,
): Array<T> {
  if (collection.length > 0) {
    const utcProps = Object.keys(collection[0]).filter((x) =>
      x.endsWith('Utc'),
    );
    const dateProps = Object.keys(collection[0]).filter(
      (x) => x.endsWith('Date') || x === 'date',
    );

    options.utcNullableProps?.forEach((t) => {
      if (utcProps.indexOf(t) === -1) {
        utcProps.push(t);
      }
    });

    options.dateNullableProps?.forEach((t) => {
      if (dateProps.indexOf(t) === -1) {
        dateProps.push(t);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // prettier-ignore
    collection.forEach((val: any) => {//NOSONAR
      utcProps.filter((p) => val[p]).forEach((p) => (val[p] = new Date(val[p])));
      dateProps.filter((p) => val[p]).forEach((p) => (val[p] = toLocalDate(val[p])));
    });
  }
  return collection;
}
export function toLocalDate(date: string): Date {
  const dt = new Date(date);
  return new Date(
    dt.getTime() + Math.abs(dt.getTimezoneOffset() * MILLI_SECS_PER_SEC),
  );
}

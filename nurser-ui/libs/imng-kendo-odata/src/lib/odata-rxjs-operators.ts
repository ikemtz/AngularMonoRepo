import { ODataPayload } from './odata-payload';
import { map } from 'rxjs/operators';
import { ODataResult } from './odata-result';

export const mapToExtDataResult = <T>() =>
  map((response: ODataPayload<T>) => {
    const result = <ODataResult<T>>{
      data: response.value,
      total: response['@odata.count'],
    };
    result.data = parseDatesInCollection(result.data);
    return result;
  });

export const firstRecord = <T>() => map((result: ODataResult<T>) => <T>(result.data.length > 0 ? result.data[0] : {}));

export function parseDatesInCollection<T>(
  collection: Array<T>,
  utcNullableProps: string[] = [],
  dateNullableProps: string[] = [],
): Array<T> {
  if (collection.length > 0) {
    const utcProps = Object.keys(collection[0]).filter(x => x.endsWith('Utc'));
    const dateProps = Object.keys(collection[0]).filter(x => x.endsWith('Date'));

    utcNullableProps.forEach(t => {
      if (utcProps.indexOf(t) === -1) utcProps.push(t);
    });

    dateNullableProps.forEach(t => {
      if (dateProps.indexOf(t) === -1) dateProps.push(t);
    });

    collection.forEach((val: any) => {
      utcProps.filter(p => val[p]).forEach(p => (val[p] = new Date(val[p])));
      dateProps.filter(p => val[p]).forEach(p => (val[p] = toLocalDate(val[p])));
    });
  }
  return collection;
}

export function toLocalDate(date: string): Date {
  const dt = new Date(date);
  return new Date(dt.getTime() + Math.abs(dt.getTimezoneOffset() * 60000));
}

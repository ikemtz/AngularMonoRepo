import { ODataPayload } from './odata-payload';
import { map, filter } from 'rxjs/operators';
import { ODataResult } from './odata-result';
import { Observable } from 'rxjs';

export const mapToExtDataResult = <T>(utcNullableProps: string[] = [], dateNullableProps: string[] = []) =>
  map((response: ODataPayload<T>) => {
    const result = {
      data: response.value,
      total: response['@odata.count'],
    } as ODataResult<T>;
    result.data = parseDatesInCollection(result.data, utcNullableProps, dateNullableProps);
    return result;
  });

export const firstRecord = <T>() => map((result: ODataResult<T>) => (result.data.length > 0 ? result.data[0] : {} as T));

export const findById = <T extends { id?: string | number; }>(id?: string | number) =>
  map((source: ODataResult<T>) => source.data.find(f => f.id === id) || {} as T);

export function parseDatesInCollection<T>(
  collection: Array<T>,
  utcNullableProps: string[] = [],
  dateNullableProps: string[] = [],
): Array<T> {
  if (collection.length > 0) {
    const utcProps = Object.keys(collection[0]).filter(x => x.endsWith('Utc'));
    const dateProps = Object.keys(collection[0]).filter(x => x.endsWith('Date'));

    utcNullableProps.forEach(t => {
      if (utcProps.indexOf(t) === -1) {
        utcProps.push(t);
      }
    });

    dateNullableProps.forEach(t => {
      if (dateProps.indexOf(t) === -1) {
        dateProps.push(t);
      }
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

export function getSubGridData<
  PARENT_ENTITY extends { id?: number | string; },
  SUB_ENTITY>(
    id: number | string,
    mappingFunction: (entity: PARENT_ENTITY) => SUB_ENTITY[]):
  (source: Observable<ODataResult<PARENT_ENTITY>>) => Observable<SUB_ENTITY[]> {
  return function (source: Observable<ODataResult<PARENT_ENTITY>>): Observable<SUB_ENTITY[]> {
    return source.pipe(
      map(t => t.data.find(f => f.id === id)),
      map((entity: PARENT_ENTITY) => mappingFunction(entity)),
      filter((t) => !!t)
    );
  };
}

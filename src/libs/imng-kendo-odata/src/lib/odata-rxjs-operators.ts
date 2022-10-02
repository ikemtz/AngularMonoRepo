import { ODataPayload } from './odata-payload';
import { map, filter } from 'rxjs/operators';
import { ODataResult } from './odata-result';
import { Observable } from 'rxjs';
import { IdType, MILLI_SECS_PER_SEC } from 'imng-nrsrx-client-utils';

export const mapToExtDataResult = <
  ENTITY extends { id?: IdType | null | undefined },
>(
  utcNullableProps: string[] = [],
  dateNullableProps: string[] = [],
) =>
  map((response: ODataPayload<ENTITY> | ENTITY[]) => {
    if (!response) {
      return { data: [], total: 0 };
    }
    const result = Array.isArray(response)
      ? {
          data: response,
          total: response.length,
        }
      : ({
          data: response.value,
          total: response['@odata.count'],
        } as ODataResult<ENTITY>);
    result.data = parseDatesInCollection(
      result.data,
      utcNullableProps,
      dateNullableProps,
    );
    return result;
  });

export const firstRecord = <
  ENTITY extends { id?: IdType | null | undefined },
>() =>
  map((result: ODataResult<ENTITY>) =>
    result?.data?.length > 0 ? result.data[0] : ({} as ENTITY),
  );

export const findById = <ENTITY extends { id?: IdType | null | undefined }>(
  id?: IdType,
  defaultValue: ENTITY = {} as ENTITY,
) =>
  map(
    (source: ODataResult<ENTITY>) =>
      source?.data?.find((f) => f.id === id) || defaultValue,
  );

export function parseDatesInCollection<
  ENTITY extends { id?: IdType | null | undefined },
>(
  collection: Array<ENTITY>,
  utcNullableProps: string[] = [],
  dateNullableProps: string[] = [],
): Array<ENTITY> {
  if (collection.length > 0) {
    const utcProps = Object.keys(collection[0]).filter((x) =>
      x.endsWith('Utc'),
    );
    const dateProps = Object.keys(collection[0]).filter(
      (x) => x.endsWith('Date') || x === 'date',
    );

    utcNullableProps?.forEach((t) => {
      if (utcProps.indexOf(t) === -1) {
        utcProps.push(t);
      }
    });

    dateNullableProps?.forEach((t) => {
      if (dateProps.indexOf(t) === -1) {
        dateProps.push(t);
      }
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection.forEach((val: any) => {
      //NOSONAR
      utcProps
        .filter((p) => val[p])
        .forEach((p) => (val[p] = new Date(val[p])));
      dateProps
        .filter((p) => val[p])
        .forEach((p) => (val[p] = toLocalDate(val[p])));
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

export function getSubGridData<
  PARENT_ENTITY extends { id?: IdType },
  SUB_ENTITY,
>(
  id: IdType | undefined,
  mappingFunction: (entity: PARENT_ENTITY) => SUB_ENTITY[],
): (
  source: Observable<ODataResult<PARENT_ENTITY>>,
) => Observable<SUB_ENTITY[]> {
  // tslint:disable-next-line: space-before-function-paren
  return function (
    source: Observable<ODataResult<PARENT_ENTITY>>,
  ): Observable<SUB_ENTITY[]> {
    return source.pipe(
      map((t) => t.data.find((f) => f.id === id) as PARENT_ENTITY),
      map((entity: PARENT_ENTITY) => mappingFunction(entity)),
      filter((t) => !!t),
    );
  };
}

export function getSubData<PARENT_ENTITY extends { id?: IdType }, SUB_ENTITY>(
  id: IdType | undefined,
  mappingFunction: (entity: PARENT_ENTITY) => SUB_ENTITY[],
): (source: Observable<Array<PARENT_ENTITY>>) => Observable<SUB_ENTITY[]> {
  // tslint:disable-next-line: space-before-function-paren
  return function (
    source: Observable<Array<PARENT_ENTITY>>,
  ): Observable<SUB_ENTITY[]> {
    return source.pipe(
      map((t) => t.find((f) => f.id === id) as PARENT_ENTITY),
      map((entity: PARENT_ENTITY) => mappingFunction(entity)),
      filter((t) => !!t),
    );
  };
}

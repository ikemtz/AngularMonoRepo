import { Observable } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { map } from 'rxjs/operators';
import { ODataPayload } from './odata-payload';
import { ODataGridDataResult } from './odata-grid-data-result';
import { ODataGridState } from './odata-grid-state';

export const getODataPagerSettings = <T>(m: {
  dataResult: ODataGridDataResult<T>;
  gridODataState?: ODataGridState;
}) => {
  if (!m.gridODataState || m.dataResult.total <= m.gridODataState.take) {
    return false;
  }
  let pageCount = m.dataResult.total / m.gridODataState.take;
  pageCount = Math.min(10, Math.ceil(pageCount));
  const settings: PagerSettings = {
    buttonCount: pageCount,
    info: true,
    pageSizes: true,
    previousNext: true,
    type: 'numeric'
  };
  return settings;
};

export const mapPagerSettings = <T>() => (
  source: Observable<{
    dataResult: ODataGridDataResult<T>;
    gridODataState?: ODataGridState;
  }>
) => source.pipe(map(m => getODataPagerSettings(m)));

export const mapToExtGridDataResult = <T>() =>
  map((response: ODataPayload<T>) => {
    const result = <ODataGridDataResult<T>>{
      data: response.value,
      total: response['@odata.count']
    };
    result.data = parseDatesInCollection(result.data);
    return result;
  });

export const firstRecord = <T>() =>
  map((result: ODataGridDataResult<T>) => <T>(result.data.length > 0 ? result.data[0] : {}));

  
export function parseDatesInCollection<T>(
  collection: Array<T>,
  utcNullableProps: string[] = [],
  dateNullableProps: string[] = []
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
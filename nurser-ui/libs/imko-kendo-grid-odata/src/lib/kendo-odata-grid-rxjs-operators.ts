import { Observable } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { map } from 'rxjs/operators';
import { ODataResult, ODataState } from 'imng-kendo-odata';

export const getODataPagerSettings = <T>(m: { dataResult: ODataResult<T>; gridODataState?: ODataState }) => {
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
    type: 'numeric',
  };
  return settings;
};

export const mapPagerSettings = <T>() => (
  source: Observable<{
    dataResult: ODataResult<T>;
    gridODataState?: ODataState;
  }>,
) => source.pipe(map(m => getODataPagerSettings(m)));

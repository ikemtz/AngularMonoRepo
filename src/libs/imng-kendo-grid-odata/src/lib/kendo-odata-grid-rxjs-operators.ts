import { Observable } from 'rxjs';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { map } from 'rxjs/operators';
import { ODataResult, ODataState } from 'imng-kendo-odata';

export const getODataPagerSettings = <T>(m: { gridData: ODataResult<T>; gridODataState?: ODataState; }) => {
  if (!m.gridODataState || m.gridData.total <= m.gridODataState.take) {
    return false;
  }
  let pageCount = m.gridData.total / m.gridODataState.take;
  pageCount = Math.min(10, Math.ceil(pageCount));
  return {
    buttonCount: pageCount,
    info: true,
    pageSizes: [10, 20, 50, 100],
    previousNext: true,
    type: 'numeric',
  };
};

export const mapPagerSettings = <T>() => (
  source: Observable<{
    gridData: ODataResult<T>;
    gridODataState?: ODataState;
  }>,
) => source.pipe(map(m => getODataPagerSettings(m)));

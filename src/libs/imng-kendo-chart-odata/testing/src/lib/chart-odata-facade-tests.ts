import { readFirst } from 'imng-ngrx-utils/testing';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IChartODataFacade } from 'imng-kendo-chart-odata';
import { ODataResult, ODataService } from 'imng-kendo-odata';
import { Observable, of } from 'rxjs';

export async function testLoadSeriesData<TFacade extends IChartODataFacade>(
  facade: TFacade,
  odataService: ODataService,
): Promise<void> {
  let seriesData = await readFirst(facade.seriesData$);
  expect(seriesData).toStrictEqual([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const response: Observable<ODataResult<any>> = of({
    data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }],
    total: 3,
  });
  odataService.fetch = jest.fn(() => response);
  facade.loadSeriesData({});
  seriesData = await readFirst(facade.seriesData$);
  expect(seriesData).toBeTruthy();
  expect(odataService.fetch).toBeCalledTimes(1);
}

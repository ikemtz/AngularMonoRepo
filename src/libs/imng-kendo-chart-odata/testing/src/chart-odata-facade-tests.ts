import { readFirst } from 'imng-ngrx-utils/testing';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { IChartODataFacade } from 'imng-kendo-chart-odata';
import { ODataService } from 'imng-kendo-odata';
import { of } from 'rxjs';

export async function testLoadSeriesData<TFacade extends IChartODataFacade>(
  facade: TFacade,
  odataservice: ODataService,
): Promise<void> {
  let seriesData = await readFirst(facade.seriesData$);
  expect(seriesData).toBeFalsy();
  const response = of({ data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }], total: 3 } as never);
  odataservice.fetch = jest.fn(() => response);
  facade.loadSeriesData({});
  seriesData = await readFirst(facade.seriesData$);
  expect(seriesData).toBeTruthy();
  expect(odataservice.fetch).toBeCalledTimes(1);
}

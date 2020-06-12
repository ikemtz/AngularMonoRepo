import { readFirst, cold } from '@nrwl/angular/testing';
import { IChartODataFacade } from 'imng-kendo-chart-odata';
import { ODataService, ODataResult } from 'imng-kendo-odata';

export async function testLoadSeriesData<TFacade extends IChartODataFacade>(
  done: jest.DoneCallback,
  facade: TFacade,
  odataservice: ODataService,
) {
  try {
    let seriesData = await readFirst(facade.seriesData$);
    expect(seriesData).toBeFalsy();
    const response = cold('a-|', {
      a: { data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }], total: 3 } as ODataResult<{ id: string; }>,
    });
    odataservice.fetch = jest.fn(() => response);
    facade.loadSeriesData({});
    seriesData = await readFirst(facade.seriesData$);
    expect(seriesData).toBeTruthy();
    expect(odataservice.fetch).toBeCalledTimes(1);
    done();
  } catch (err) {
    done.fail(err);
  }
}

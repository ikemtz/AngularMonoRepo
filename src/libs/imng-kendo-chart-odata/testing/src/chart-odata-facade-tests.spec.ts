import { testLoadSeriesData, } from '.';
import { BehaviorSubject, Observable } from 'rxjs';
import { ODataService } from 'imng-kendo-odata';
import { ChartSeriesDataPoint } from 'imng-kendo-chart-odata';
import { GroupResult } from '@progress/kendo-data-query';

describe('Testing testLoadSeriesData', () => {
  it('should validate', async done => {
    try {
      const odataService: any = {};
      const facade = new ChartODataMockFacade(odataService);
      await testLoadSeriesData(done, facade, odataService);
      done();
    } catch (err) {
      done.fail(err);
    }
  });
});

class ChartODataMockFacade {
  constructor(private readonly service: any) { }
  private _seriesData = new BehaviorSubject<ChartSeriesDataPoint[] | GroupResult[]>(null);
  public seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]> = this._seriesData.asObservable();
  public loadSeriesData(filter: any): void {
    this._seriesData.next([
      { seriesName: '🔷integration Tests🔷', metric: 5, interval: '💩AF' },
    ]);
    this.service.fetch();
  }
}

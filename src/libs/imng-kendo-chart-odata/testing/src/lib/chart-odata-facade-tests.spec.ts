import { describe, it } from '@jest/globals';
import { testLoadSeriesData } from '.';
import { BehaviorSubject, Observable } from 'rxjs';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { ChartSeriesDataPoint } from 'imng-kendo-chart-odata';
import { GroupResult } from '@progress/kendo-data-query';

describe('Testing testLoadSeriesData', () => {
  it('should validate', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const odataService: any = {};
    const facade = new ChartODataMockFacade(odataService);
    await testLoadSeriesData(facade, odataService);
  });
});

class ChartODataMockFacade {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private readonly service: any) {}
  private readonly _seriesData = new BehaviorSubject<
    ChartSeriesDataPoint[] | GroupResult[]
  >([]);
  public seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]> =
    this._seriesData.asObservable();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
  public loadSeriesData(filter: any): void {
    this._seriesData.next([
      { seriesName: '🔷integration Tests🔷', metric: 5, interval: '💩AF' },
    ]);
    this.service.fetch();
  }
}

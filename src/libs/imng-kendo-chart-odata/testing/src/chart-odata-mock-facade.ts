import { Observable, of } from 'rxjs';
import { IChartODataFacade, ChartSeriesDataPoint } from 'imng-kendo-chart-odata';
import { GroupResult } from '@progress/kendo-data-query';

export class ChartODataMockFacade implements IChartODataFacade {
  public isDataLoadPending$: Observable<boolean> = of(true);
  public seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]> = of([
    { seriesName: '🔷integration Tests🔷', metric: 5, interval: '💩' },
  ]);
  public loadSeriesData(filter: any): void {}
}

export function createChartODataMockFacade(mockFacade?: IChartODataFacade | any): IChartODataFacade {
  const localFacade = new ChartODataMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.seriesData$ = mockFacade.seriesData$ || localFacade.seriesData$;
  mockFacade.loadSeriesData = mockFacade.loadSeriesData || localFacade.loadSeriesData;
  return mockFacade;
}

import { jest } from '@jest/globals';
import { Observable, of } from 'rxjs';
import {
  IChartODataFacade,
  ChartSeriesDataPoint,
} from 'imng-kendo-chart-odata';
import { GroupResult } from '@progress/kendo-data-query';

export class ChartODataMockFacade implements IChartODataFacade {
  public seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]> = of([
    { seriesName: '🔷integration Tests🔷', metric: 5, interval: '💩' },
  ]);
  public loadSeriesData: (filter: unknown) => void = jest.fn();
}

export function createChartODataMockFacade(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mockFacade?: IChartODataFacade | any,
): IChartODataFacade {
  const localFacade = new ChartODataMockFacade();
  if (!mockFacade) {
    return localFacade;
  }
  mockFacade.seriesData$ = mockFacade.seriesData$ || localFacade.seriesData$;
  mockFacade.loadSeriesData = mockFacade.loadSeriesData || jest.fn();
  return mockFacade;
}

import { Observable } from 'rxjs';
import { GroupResult } from '@progress/kendo-data-query';
import { ChartSeriesDataPoint } from './chart-series-data-point';

export interface IChartODataFacade {
  seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]>;
  loadSeriesData(filter: unknown): void;
}

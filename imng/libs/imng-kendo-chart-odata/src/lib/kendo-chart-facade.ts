import { Observable } from 'rxjs';
import { GroupResult } from '@progress/kendo-data-query';
import { ChartSeriesDataPoint } from './chart-series-data-point';

export interface KendoChartFacade {
  readonly loading$: Observable<boolean>;
  readonly seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]>;
  loadSeriesData(filter: any): void;
}

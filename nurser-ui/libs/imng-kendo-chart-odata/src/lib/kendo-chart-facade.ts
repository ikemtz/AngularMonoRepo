import { Observable } from 'rxjs';
import { GroupResult } from '@progress/kendo-data-query';
import { ODataState } from 'imng-kendo-odata';
import { ChartSeriesDataPoint } from './chart-series-data-point';

export interface KendoChartFacade {
  readonly loading$: Observable<boolean>;
  readonly seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]>;
  loadSeriesData(state: ODataState): void;
}

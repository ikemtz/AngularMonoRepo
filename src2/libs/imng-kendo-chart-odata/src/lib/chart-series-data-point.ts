import { IdType } from 'imng-nrsrx-client-utils';

export interface ChartSeriesDataPoint {
  seriesName: string;
  metric: number;
  interval: IdType;
}

import { TrendlineForecast } from './trendline-forecase';

export interface SeriesTrendline {
  forecast?: TrendlineForecast;
  order?: number;
  period?: number;
}

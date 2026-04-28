import { TrendlineForecast } from './trendline-forecast';

export interface SeriesTrendline {
  forecast?: TrendlineForecast;
  order?: number;
  period?: number;
}

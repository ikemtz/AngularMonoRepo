import { IMNG_KENDO_CHART_STUB } from '../components/kendo-chart-stub.component';
import { Point } from './point';
import { Rect } from './rect';

export interface SeriesVisualArgs {
  category: never;
  center?: Point;
  createVisual: () => Element;
  dataItem: never;
  endAngle?: number;
  innerRadius?: number;
  options: never;
  percentage?: number;
  points?: Point[];
  radius?: number;
  rect: Rect;
  runningTotal?: number;
  sender: IMNG_KENDO_CHART_STUB;
  series: never;
  startAngle?: number;
  total?: number;
  value: never;
}

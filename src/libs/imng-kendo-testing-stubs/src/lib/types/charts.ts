import { CrosshatchPattern } from '../interfaces/crosshatch-pattern';
import { DiagonalStripesPattern } from '../interfaces/diagonal-stripes-pattern';
import { VerticalStripesPattern } from '../interfaces/vertical-stripes-pattern';
import { DotsPattern } from '../interfaces/dots-pattern';
import { GridPattern } from '../interfaces/grid-pattern';

export type DashType =
  | 'dash'
  | 'dashDot'
  | 'dot'
  | 'longDash'
  | 'longDashDot'
  | 'longDashDotDot'
  | 'solid';

export type SeriesType =
  | 'area'
  | 'bar'
  | 'boxPlot'
  | 'bubble'
  | 'bullet'
  | 'candlestick'
  | 'column'
  | 'donut'
  | 'exponentialTrendline'
  | 'funnel'
  | 'pyramid'
  | 'heatmap'
  | 'horizontalWaterfall'
  | 'line'
  | 'linearTrendline'
  | 'logarithmicTrendline'
  | 'movingAverageTrendline'
  | 'ohlc'
  | 'pie'
  | 'polarArea'
  | 'polarLine'
  | 'polarScatter'
  | 'polynomialTrendline'
  | 'powerTrendline'
  | 'radarArea'
  | 'radarColumn'
  | 'radarLine'
  | 'rangeArea'
  | 'rangeBar'
  | 'rangeColumn'
  | 'scatter'
  | 'scatterLine'
  | 'verticalArea'
  | 'verticalBoxPlot'
  | 'verticalBullet'
  | 'verticalLine'
  | 'verticalRangeArea'
  | 'waterfall';

export type SeriesPattern =
  | VerticalStripesPattern
  | CrosshatchPattern
  | DiagonalStripesPattern
  | GridPattern
  | DotsPattern;

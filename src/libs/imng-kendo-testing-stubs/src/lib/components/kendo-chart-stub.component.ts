import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { jest } from '@jest/globals';
import { SeriesDefault } from '../interfaces/series-default';

@Component({
  selector: 'kendo-chart',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_CHART_STUB {
  @Input() public axisDefaults: unknown;
  @Input() public categoryAxis: unknown;
  @Input() public chartArea: unknown;
  @Input() public drilldownLevel?: number;
  @Input() public legend: unknown;
  @Input() public noData = true;
  @Input() public paneDefaults: unknown;
  @Input() public panes?: unknown[];
  @Input() public pannable: unknown = false;
  @Input() public plotArea: unknown;
  @Input() public popupSettings: unknown;
  @Input() public renderAs: 'canvas' | 'svg' = 'svg';
  @Input() public resizeRateLimit = 10;
  @Input() public series?: unknown[];
  @Input() public seriesColors?: string[];
  @Input() public seriesDefaults?: SeriesDefault;
  @Input() public subTitle: unknown;
  @Input() public svgIcon: unknown;
  @Input() public title: unknown;
  @Input() public tooltip: unknown;
  @Input() public transitions = true;
  @Input() public valueAxis: unknown;
  @Input() public xAxis: unknown;
  @Input() public yAxis: unknown;
  @Input() public zoomable: unknown;

  public surface?: unknown;

  public axisLabelClick = new EventEmitter<unknown>();
  public drag = new EventEmitter<unknown>();
  public dragEnd = new EventEmitter<unknown>();
  public dragStart = new EventEmitter<unknown>();
  public drilldown = new EventEmitter<unknown>();
  public drilldownLevelChange = new EventEmitter<number>();
  public legendItemClick = new EventEmitter<unknown>();
  public legendItemHover = new EventEmitter<unknown>();
  public legendItemLeave = new EventEmitter<unknown>();
  public noteClick = new EventEmitter<unknown>();
  public noteHover = new EventEmitter<unknown>();
  public noteLeave = new EventEmitter<unknown>();
  public paneRender = new EventEmitter<unknown>();
  public plotAreaClick = new EventEmitter<unknown>();
  public plotAreaHover = new EventEmitter<unknown>();
  public plotAreaLeave = new EventEmitter<unknown>();
  public render = new EventEmitter<unknown>();
  public select = new EventEmitter<unknown>();
  public selectEnd = new EventEmitter<unknown>();
  public selectStart = new EventEmitter<unknown>();
  public seriesClick = new EventEmitter<unknown>();
  public seriesHover = new EventEmitter<unknown>();
  public seriesLeave = new EventEmitter<unknown>();
  public seriesOver = new EventEmitter<unknown>();
  public zoom = new EventEmitter<unknown>();
  public zoomEnd = new EventEmitter<unknown>();
  public zoomStart = new EventEmitter<unknown>();
  public exportImage = jest.fn(() => Promise.resolve('complete'));
  public exportSVG = jest.fn(() => Promise.resolve('complete'));
  public exportVisual = jest.fn(() => ({}));
  public findAxisByName = jest.fn(() => ({}));
  public findPaneByIndex = jest.fn(() => ({}));
  public findPaneByName = jest.fn(() => ({}));
  public getPlotArea = jest.fn(() => ({}));
  public hideTooltip = jest.fn();
  public notifyChanges = jest.fn();
  public reloadTheme = jest.fn();
  public resize = jest.fn();
  public showTooltip = jest.fn();
  public toggleHighlight = jest.fn();
}

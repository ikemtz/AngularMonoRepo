import { OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { GroupResult } from '@progress/kendo-data-query';
import { ODataState } from 'imng-kendo-odata';
import { KendoChartFacade } from './kendo-chart-facade';
import { ChartSeriesDataPoint } from './chart-series-data-point';

export abstract class KendoChartODataBaseComponent<FACADE extends KendoChartFacade> implements OnInit, OnDestroy {
  private allSubscription: Subscription[] = [];
  protected abstract odataState: ODataState;
  readonly seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]>;
  public readonly loading$: Observable<boolean>;
  constructor(protected readonly facade: FACADE, private readonly gridRefresh$: Observable<any> = null) {
    this.seriesData$ = this.facade.seriesData$;

    if (gridRefresh$) {
      this.allSubscription.push(this.gridRefresh$.subscribe(() => this.facade.loadSeriesData(this.odataState)));
    }
  }

  ngOnInit() {
    this.facade.loadSeriesData(this.odataState);
  }

  ngOnDestroy() {
    this.allSubscription.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}

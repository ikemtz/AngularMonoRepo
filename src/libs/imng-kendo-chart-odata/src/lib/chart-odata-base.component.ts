import { OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { GroupResult } from '@progress/kendo-data-query';
import { IChartODataFacade } from './chart-odata-facade';
import { ChartSeriesDataPoint } from './chart-series-data-point';

export abstract class ChartODataBaseComponent<FACADE extends IChartODataFacade> implements OnDestroy {
  public allSubscription: Subscription[] = [];
  public readonly seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]>;
  public readonly isDataLoadPending$: Observable<boolean>;
  constructor(public readonly facade: FACADE, public readonly gridRefresh$: Observable<any> = null) {
    this.seriesData$ = this.facade.seriesData$;

    if (gridRefresh$) {
      this.allSubscription.push(this.gridRefresh$.subscribe(() => this.loadChart()));
    }
  }

  public abstract loadChart(): void;

  ngOnDestroy() {
    this.allSubscription.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}

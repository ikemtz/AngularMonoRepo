import { OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupResult } from '@progress/kendo-data-query';
import { IChartODataFacade } from './chart-odata-facade';
import { ChartSeriesDataPoint } from './chart-series-data-point';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';

export abstract class ChartODataBaseComponent<FACADE extends IChartODataFacade> implements OnDestroy, Subscribable {
  public allSubscriptions = new Subscriptions();
  public readonly seriesData$: Observable<ChartSeriesDataPoint[] | GroupResult[]>;
  public readonly isDataLoadPending$: Observable<boolean>;
  constructor(public readonly facade: FACADE, public readonly gridRefresh$: Observable<unknown> = null) {
    this.seriesData$ = this.facade.seriesData$;

    if (gridRefresh$) {
      this.allSubscriptions.push(this.gridRefresh$.subscribe(() => this.loadChart()));
    }
  }

  public abstract loadChart(): void;

  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}

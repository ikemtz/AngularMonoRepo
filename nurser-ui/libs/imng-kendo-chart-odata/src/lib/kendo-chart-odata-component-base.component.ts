import { OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { GroupResult } from '@progress/kendo-data-query';
import { ODataState } from 'imng-kendo-odata';
import { KendoChartFacade } from './kendo-chart-facade';

export abstract class KendoChartODataComponentBaseComponent<FACADE extends KendoChartFacade<ENTITY>, ENTITY>
  implements OnInit, OnDestroy {
  private allSubscription: Subscription[] = [];
  readonly seriesData$: Observable<ENTITY[] | GroupResult[]>;
  public readonly loading$: Observable<boolean>;
  constructor(
    protected readonly facade: FACADE,
    protected readonly state: ODataState,
    private readonly gridRefresh$: Observable<any> = null,
  ) {
    this.seriesData$ = this.facade.seriesData$;

    if (gridRefresh$) {
      this.allSubscription.push(gridRefresh$.subscribe(() => this.facade.loadSeriesData(this.state)));
    }
  }

  ngOnInit() {
    this.facade.loadSeriesData(this.state);
  }

  ngOnDestroy() {
    this.allSubscription.forEach(subscription => {
      if (subscription) {
        subscription.unsubscribe();
      }
    });
  }
}

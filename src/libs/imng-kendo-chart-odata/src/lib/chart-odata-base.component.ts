import { Directive, InjectionToken, Input, OnDestroy, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupResult } from '@progress/kendo-data-query';
import { IChartODataFacade } from './chart-odata-facade';
import { ChartSeriesDataPoint } from './chart-series-data-point';
import { Subscribable, Subscriptions } from 'imng-ngrx-utils';

const FACADE = new InjectionToken<IChartODataFacade>('imng-chart-facade');

@Directive()
export abstract class ChartODataBaseComponent<FACADE extends IChartODataFacade>
  implements OnDestroy, Subscribable {
  readonly facade = inject<FACADE>(FACADE);
  readonly gridRefresh$ = inject<Observable<unknown> | null>(Observable<unknown>) ?? null;

  public allSubscriptions = new Subscriptions();
  public readonly seriesData$: Observable<
    ChartSeriesDataPoint[] | GroupResult[]
  >;
  public readonly isDataLoadPending$?: Observable<boolean>;
  @Input() public height: string | number = 400; //NOSONAR

  constructor() {
    const gridRefresh$ = this.gridRefresh$;

    this.seriesData$ = this.facade.seriesData$;

    if (gridRefresh$) {
      this.allSubscriptions.push(
        this.gridRefresh$?.subscribe(() => this.loadChart()),
      );
    }
  }

  public abstract loadChart(): void;

  public ngOnDestroy(): void {
    this.allSubscriptions.unsubscribeAll();
  }
}

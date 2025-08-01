import { InjectionToken, Injectable, inject } from '@angular/core';
import {
  ApplicationInsights,
  IConfiguration,
} from '@microsoft/applicationinsights-web';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, tap, filter } from 'rxjs';

export const APP_INSIGHTS_CONFIG = new InjectionToken('app-insights-config');

@Injectable({
  providedIn: 'root',
})
export class AppInsightsMonitoringService {
  readonly appInsightsConfig = inject<IConfiguration>(APP_INSIGHTS_CONFIG);

  public readonly appInsights: ApplicationInsights;
  constructor() {
    const appInsightsConfig = this.appInsightsConfig;

    this.appInsights = new ApplicationInsights({ config: appInsightsConfig });
    this.appInsights.loadAppInsights();
  }

  public setAuthenticatedUserContext(userId: string): void {
    this.appInsights.setAuthenticatedUserContext(userId, undefined, true);
  }

  public clearAuthenticatedUserContext(): void {
    this.appInsights.clearAuthenticatedUserContext();
  }

  public logException(
    exception: Error,
    properties?: never,
    measurements?: { [key: string]: number },
  ): void {
    this.appInsights.trackException({ exception, properties, measurements });
  }

  public logEvent(
    name: string,
    properties?: never,
    measurements?: { [key: string]: number },
  ): void {
    this.appInsights.trackEvent({ name, properties, measurements });
  }

  public trackEventsEffect(
    actions$: Actions,
    logPayload: boolean,
  ): Observable<Action> {
    return actions$.pipe(
      tap((x) => {
        this.logEvent(
          x.type,
          logPayload ? (x as unknown as { payload: never }).payload : undefined,
        );
      }),
    );
  }

  public trackErrorsEffect(actions$: Actions): Observable<Action> {
    return actions$.pipe(
      filter((x) => {
        const type = x.type.toUpperCase();
        return type.endsWith('ERROR') || type.endsWith('FAILURE');
      }),
      tap((x) => {
        this.logException(x as never);
      }),
    );
  }
}

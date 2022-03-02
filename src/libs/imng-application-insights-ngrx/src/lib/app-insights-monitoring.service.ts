/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, Inject, InjectionToken } from '@angular/core';
import { ApplicationInsights, IConfiguration } from '@microsoft/applicationinsights-web';
import { Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
export const APP_INSIGHTS_CONFIG = new InjectionToken('app-insights-config');

@Injectable({
  providedIn: 'root',
})
export class AppInsightsMonitoringService {
  public readonly appInsights: ApplicationInsights;
  constructor(@Inject(APP_INSIGHTS_CONFIG) readonly appInsightsConfig: IConfiguration) {
    this.appInsights = new ApplicationInsights({ config: appInsightsConfig });
    this.appInsights.loadAppInsights();
  }

  public setAuthenticatedUserContext(userId: string): void {
    this.appInsights.setAuthenticatedUserContext(userId, undefined, true);
  }

  public clearAuthenticatedUserContext(): void {
    this.appInsights.clearAuthenticatedUserContext();
  }

  public logException(exception: Error, properties?: object, measurements?: { [key: string]: number }): void {
    this.appInsights.trackException({ exception, properties, measurements });
  }

  public logEvent(name: string, properties?: object, measurements?: { [key: string]: number }): void {
    this.appInsights.trackEvent({ name, properties, measurements });
  }

  public trackEventsEffect(actions$: Actions, logPayload: boolean): Observable<Action> {
    return actions$.pipe(
      tap((x) => {
        this.logEvent(x.type, logPayload ? (x as unknown as { payload: object }).payload : null);
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

import { Injectable, Inject, InjectionToken } from '@angular/core';
import { ApplicationInsights, IConfiguration } from '@microsoft/applicationinsights-web';
import { Actions } from '@ngrx/effects';
import { tap, filter } from 'rxjs/operators';
export const APP_INSIGHTS_CONFIG = new InjectionToken('app-insights-config');

@Injectable({
  providedIn: 'root',
})
export class AppInsightsMonitoringService {
  private readonly appInsights: ApplicationInsights;
  constructor(@Inject(APP_INSIGHTS_CONFIG) readonly appInsightsConfig: IConfiguration) {
    this.appInsights = new ApplicationInsights({ config: appInsightsConfig });
    this.appInsights.loadAppInsights();
  }

  public setAuthenticatedUserContext(userId: string) {
    this.appInsights.setAuthenticatedUserContext(userId, null, true);
  }

  public clearAuthenticatedUserContext() {
    this.appInsights.clearAuthenticatedUserContext();
  }

  public logException(exception: Error, properties?: any, measurements?: any) {
    this.appInsights.trackException({ exception, properties, measurements });
  }

  public logEvent(name: string, properties?: any, measurements?: any) {
    this.appInsights.trackEvent({ name, properties, measurements });
  }

  public trackEventsEffect(actions$: Actions, logPayload: boolean) {
    return actions$.pipe(
      tap(x => {
        this.logEvent(x.type, logPayload ? (x as any).payload : null);
      }),
    );
  }

  public trackErrorsEffect(actions$: Actions) {
    return actions$.pipe(
      filter(x => {
        const type = x.type.toUpperCase();
        return type.endsWith('ERROR') || type.endsWith('FAILURE');
      }),
      tap(x => {
        this.logException(x as any);
      }),
    );
  }
}

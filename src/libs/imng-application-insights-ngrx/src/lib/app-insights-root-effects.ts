import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { tap, filter } from 'rxjs/operators';
import { AppInsightsMonitoringService } from './app-insights-monitoring.service';

abstract class AppInsightsBaseffects {
  constructor(
    protected actions$: Actions,
    protected monitor: AppInsightsMonitoringService
  ) { }
  protected readonly noDispatch = { dispatch: false };

  protected getTrackLoginPipe() {
    return this.actions$.pipe(
      filter(x => x.type.toUpperCase().endsWith('USER FOUND') && (x as any).payload),
      tap(x => {
        this.monitor.setAuthenticatedUserContext((x as any).payload.profile.email);
      })
    );
  }

  protected getTrackLogoutPipe() {
    return this.actions$.pipe(
      filter(x => 0 < x.type.toUpperCase().indexOf('SIGN OUT')),
      tap(x => {
        this.monitor.clearAuthenticatedUserContext();
      })
    );
  }

  protected getTrackExceptionsPipe() {
    return this.actions$.pipe(
      filter(x => x.type.toUpperCase().endsWith('ERROR')),
      tap(x => {
        this.monitor.logException((x as any).payload);
      })
    );
  }
}

@Injectable()
export class AppInsightsVerboseRootEffects extends AppInsightsBaseffects {
  trackEvents = createEffect(() => this.actions$.pipe(
    tap(x => this.monitor.logEvent(x.type, (x as any).payload))), this.noDispatch);

  trackLogin = createEffect(() => this.getTrackLoginPipe(), this.noDispatch);

  trackLogout = createEffect(() => this.getTrackLogoutPipe(), this.noDispatch);

  trackExceptions = createEffect(() => this.getTrackExceptionsPipe(), this.noDispatch);

  constructor(
    actions$: Actions,
    monitor: AppInsightsMonitoringService
  ) { super(actions$, monitor); }
}

@Injectable()
export class AppInsightsInfoRootEffects extends AppInsightsBaseffects {

  trackEvents = createEffect(() => this.actions$.pipe(
    tap(x => this.monitor.logEvent(x.type, null))), this.noDispatch);

  trackLogin = createEffect(() => this.getTrackLoginPipe(), this.noDispatch);

  trackLogout = createEffect(() => this.getTrackLogoutPipe(), this.noDispatch);

  trackExceptions = createEffect(() => this.getTrackExceptionsPipe(), this.noDispatch);

  constructor(
    actions$: Actions,
    monitor: AppInsightsMonitoringService
  ) { super(actions$, monitor); }
}

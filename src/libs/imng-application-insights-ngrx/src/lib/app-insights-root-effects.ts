import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { AppInsightsMonitoringService } from './app-insights-monitoring.service';

abstract class AppInsightsBaseffects {
  constructor(
    protected actions$: Actions,
    protected monitor: AppInsightsMonitoringService
  ) { }
  protected readonly noDispatch = { dispatch: false };

  protected getTrackLoginPipe(): Observable<Action> {
    return this.actions$.pipe(
      filter((x: {
        type: string; payload?: { profile?: { email?: string; }; };
      }) => x.type.toUpperCase().endsWith('USER FOUND') && !!x.payload),
      tap((x: {
        type: string; payload?: { profile?: { email?: string; }; };
      }) => {
        this.monitor.setAuthenticatedUserContext(x.payload?.profile.email);
      })
    );
  }

  protected getTrackLogoutPipe(): Observable<Action> {
    return this.actions$.pipe(
      filter(x => 0 < x.type.toUpperCase().indexOf('SIGN OUT')),
      tap(() => {
        this.monitor.clearAuthenticatedUserContext();
      })
    );
  }

  protected getTrackExceptionsPipe(): Observable<Action> {
    return this.actions$.pipe(
      filter(x => x.type.toUpperCase().endsWith('ERROR')),
      tap((x: { type: string, payload?; }) => {
        this.monitor.logException(x.payload);
      })
    );
  }
}

@Injectable()
export class AppInsightsVerboseRootEffects extends AppInsightsBaseffects {
  trackEvents = createEffect(() => this.actions$.pipe(
    tap((x: { type: string, payload?; }) => this.monitor.logEvent(x.type, x.payload))), this.noDispatch);

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

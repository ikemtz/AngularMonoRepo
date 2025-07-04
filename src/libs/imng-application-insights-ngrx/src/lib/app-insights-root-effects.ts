import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';
import { AppInsightsMonitoringService } from './app-insights-monitoring.service';

abstract class AppInsightsBaseffects {
  constructor(
    protected actions$: Actions,
    protected monitor: AppInsightsMonitoringService,
  ) {}
  protected readonly noDispatch = { dispatch: false };

  protected getTrackLoginPipe(): Observable<Action> {
    return this.actions$.pipe(
      filter(
        (x: { type: string; payload?: { profile?: { email?: string } } }) =>
          x.type.toUpperCase().endsWith('USER FOUND') && !!x.payload,
      ),
      tap((x: { type: string; payload?: { profile?: { email?: string } } }) => {
        this.monitor.setAuthenticatedUserContext(
          x.payload?.profile?.email ?? 'unknown',
        );
      }),
    );
  }

  protected getTrackLogoutPipe(): Observable<Action> {
    return this.actions$.pipe(
      filter((x) => 0 < x.type.toUpperCase().indexOf('SIGN OUT')),
      tap(() => {
        this.monitor.clearAuthenticatedUserContext();
      }),
    );
  }

  protected getTrackExceptionsPipe(): Observable<Action> {
    return this.actions$.pipe(
      filter((x) => x.type.toUpperCase().endsWith('ERROR')),
      tap((x: { type: string; payload?: Error }) => {
        this.monitor.logException(x.payload || new Error('Unknown Error'));
      }),
    );
  }
}

@Injectable()
export class AppInsightsVerboseRootEffects extends AppInsightsBaseffects {
  trackEvents = createEffect(() => {
    return this.actions$.pipe(
      tap((x: { type: string; payload?: never }) =>
        this.monitor.logEvent(x.type, x.payload),
      ),
    );
  }, this.noDispatch);

  trackLogin = createEffect(() => {
    return this.getTrackLoginPipe();
  }, this.noDispatch);

  trackLogout = createEffect(() => {
    return this.getTrackLogoutPipe();
  }, this.noDispatch);

  trackExceptions = createEffect(() => {
    return this.getTrackExceptionsPipe();
  }, this.noDispatch);

  constructor() {
    const actions$ = inject(Actions);
    const monitor = inject(AppInsightsMonitoringService);

    super(actions$, monitor);
  }
}

@Injectable()
export class AppInsightsInfoRootEffects extends AppInsightsBaseffects {
  trackEvents = createEffect(() => {
    return this.actions$.pipe(tap((x) => this.monitor.logEvent(x.type)));
  }, this.noDispatch);

  trackLogin = createEffect(() => {
    return this.getTrackLoginPipe();
  }, this.noDispatch);

  trackLogout = createEffect(() => {
    return this.getTrackLogoutPipe();
  }, this.noDispatch);

  trackExceptions = createEffect(() => {
    return this.getTrackExceptionsPipe();
  }, this.noDispatch);

  constructor() {
    const actions$ = inject(Actions);
    const monitor = inject(AppInsightsMonitoringService);

    super(actions$, monitor);
  }
}

import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, } from '@ngrx/effects';
import { map, filter, switchMap } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';

import { State } from '@ngrx/store';
import { signOutRedirect, onSessionTimingOut } from './idle.actions';
import { IDLE_CONFIG, IdleConfig } from '../idle-config';
import { IDLE_FEATURE_KEY } from './idle.reducer';

@Injectable()
export class IdleEffects {

  private loggedInActionPipe$: Observable<boolean>;

  signOutRedirect$ = createEffect(() => this.getLoggedInActionPipe().pipe(
    switchMap(() => timer(this.idleConfig.autoLogoutInMs)),
    map(() => signOutRedirect())));

  timingOut$ = createEffect(() => this.getLoggedInActionPipe().pipe(
    switchMap(() => timer(this.idleConfig.timeoutWarningInMs)),
    map(() => onSessionTimingOut(this.idleConfig))));

  constructor(
    @Inject(IDLE_CONFIG) private readonly idleConfig: IdleConfig,
    private readonly state: State<{
      oidc: { loggedIn: boolean; };
      [IDLE_FEATURE_KEY]: { isTimingOut: boolean; };
    }>,
    private readonly actions$: Actions) {
  }

  private getLoggedInActionPipe(): Observable<boolean> {
    return this.loggedInActionPipe$ = this.actions$.pipe(
      switchMap(() => this.state.pipe(map(s => s.oidc.loggedIn && !s[IDLE_FEATURE_KEY].isTimingOut))),
      filter(val => val));
  }
}

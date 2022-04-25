import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map, filter, switchMap } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { signOutRedirect, onSessionTimingOut } from './idle.actions';
import { IDLE_CONFIG, IdleConfig } from '../idle-config';
import { idleQuery } from './idle.selectors';

@Injectable()
export class IdleEffects {
  public signOutRedirect$ = createEffect(() => {
    return this.getLoggedInActionPipe().pipe(
      switchMap(() => timer(this.idleConfig.autoLogoutInMs)),
      map(() => signOutRedirect())
    );
  }
  );

  public timingOut$ = createEffect(() => {
    return this.getLoggedInActionPipe().pipe(
      switchMap(() => timer(this.idleConfig.timeoutWarningInMs)),
      map(() => onSessionTimingOut(this.idleConfig))
    );
  });

  public getLoggedInActionPipe(): Observable<boolean> {
    return this.actions$.pipe(
      switchMap(() =>
        this.store.select(idleQuery.selectLoggedInAndIsNotTimingOut).pipe(filter((val) => val))
      ));
  }

  constructor(
    @Inject(IDLE_CONFIG) private readonly idleConfig: IdleConfig,
    private readonly store: Store,
    private readonly actions$: Actions
  ) { }
}

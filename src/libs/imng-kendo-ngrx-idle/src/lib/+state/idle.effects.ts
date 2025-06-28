import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { map, filter, switchMap } from 'rxjs/operators';
import { timer, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { signOutRedirect, onSessionTimingOut } from './idle.actions';
import { IDLE_CONFIG, IdleConfig } from '../idle-config';
import { idleQuery } from './idle.selectors';

@Injectable({ providedIn: 'root' })
export class IdleEffects {
  private readonly idleConfig = inject<IdleConfig>(IDLE_CONFIG);
  private readonly store = inject(Store);
  private readonly actions$ = inject(Actions);

  public signOutRedirect$ = createEffect(() => {
    return this.getLoggedInActionPipe().pipe(
      switchMap(() => timer(this.idleConfig.autoLogoutInMs)),
      map(() => signOutRedirect()),
    );
  });

  public timingOut$ = createEffect(() => {
    return this.getLoggedInActionPipe().pipe(
      switchMap(() => timer(this.idleConfig.timeoutWarningInMs)),
      map(() => onSessionTimingOut(this.idleConfig)),
    );
  });

  public getLoggedInActionPipe(): Observable<boolean> {
    return this.actions$.pipe(
      switchMap(() =>
        this.store
          .select(idleQuery.selectLoggedInAndIsNotTimingOut)
          .pipe(filter((val) => val)),
      ),
    );
  }
}

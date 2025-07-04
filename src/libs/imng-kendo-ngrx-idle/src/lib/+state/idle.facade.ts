import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { idleQuery } from './idle.selectors';
import { Observable } from 'rxjs';
import { onSessionExtended } from './idle.actions';

@Injectable({
  providedIn: 'root',
})
export class IdleFacade {
  private readonly store = inject(Store);


  isTimingOut$: Observable<boolean> = this.store.select(
    idleQuery.getIsTimingOut
  );
  timeOutSpanInMs$: Observable<number | undefined> = this.store.select(
    idleQuery.getTimeoutSpanInMs
  );

  public extendSession(): void {
    this.store.dispatch(onSessionExtended());
  }
}

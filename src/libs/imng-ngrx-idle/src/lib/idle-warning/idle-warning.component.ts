import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdleFacade } from '../+state/idle.facade';
import { BehaviorSubject, Subscription, Subject, interval, Observable } from 'rxjs';
import { tap, filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'imng-idle-warning',
  templateUrl: './idle-warning.component.html',
  styleUrls: ['./idle-warning.component.scss']
})
export class IdleWarningComponent implements OnInit, OnDestroy {
  public readonly isSessionTimingOut$ = new BehaviorSubject<boolean>(false);
  public secondsRemaining$: Observable<number>;
  private timeoutSub: Subscription;

  constructor(private readonly idleFacade: IdleFacade) {
  }

  ngOnInit(): void {
    let timeOutSpan = 0;
    const msInSec = 1000;
    this.timeoutSub = this.idleFacade.isTimingOut$.pipe(tap(value => this.isSessionTimingOut$.next(value))).subscribe();
    this.secondsRemaining$ = this.idleFacade.timeOutSpanInMs$.pipe(
      filter(t => t > 0),
      tap(t => timeOutSpan = t),
      switchMap(t => interval(msInSec)),
      map(() => Math.floor(timeOutSpan / msInSec)),
      tap(() => timeOutSpan -= msInSec)
    );
  };

  ngOnDestroy(): void {
    this.timeoutSub?.unsubscribe();
  };
  close(): void {
    this.isSessionTimingOut$.next(false);
  };
  extend(): void {
    this.idleFacade.extendSession();
  }
}

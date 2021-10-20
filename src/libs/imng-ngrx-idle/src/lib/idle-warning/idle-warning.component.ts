import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdleFacade } from '../+state/idle.facade';
import { BehaviorSubject, Subscription, interval, Observable } from 'rxjs';
import { tap, filter, switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'imng-idle-warning',
  template: `<kendo-dialog
    title="Idle Session Warning"
    *ngIf="isSessionTimingOut$ | async"
    (close)="close()"
    [minWidth]="250"
    [width]="450"
  >
    <p class="warn-msg">Do you wish to extend your session?</p>
    <p class="warn-msg">{{ secondsRemaining$ | async }} Seconds remaining</p>
    <kendo-dialog-actions>
      <button kendoButton (click)="close()">No</button>
      <button kendoButton (click)="extend()" [primary]="true">Yes</button>
    </kendo-dialog-actions>
  </kendo-dialog> `,
  styles: [
    `
      .warn-msg {
        margin: 30px;
        text-align: center;
      }
    `,
  ],
})
export class IdleWarningComponent implements OnInit, OnDestroy {
  public readonly isSessionTimingOut$ = new BehaviorSubject<boolean>(false);
  public secondsRemaining$: Observable<number>;
  private timeoutSub: Subscription;

  constructor(public readonly idleFacade: IdleFacade) {}

  public ngOnInit(): void {
    let timeOutSpan = 0;
    const msInSec = 1000;
    this.timeoutSub = this.idleFacade.isTimingOut$
      .pipe(tap((value) => this.isSessionTimingOut$.next(value)))
      .subscribe();
    this.secondsRemaining$ = this.idleFacade.timeOutSpanInMs$.pipe(
      filter((t) => t > 0),
      tap((t) => (timeOutSpan = t)),
      switchMap(() => interval(msInSec)),
      map(() => Math.floor(timeOutSpan / msInSec)),
      tap(() => (timeOutSpan -= msInSec)),
    );
  }

  public ngOnDestroy(): void {
    this.timeoutSub?.unsubscribe();
  }

  public close(): void {
    this.isSessionTimingOut$.next(false);
  }

  public extend(): void {
    this.idleFacade.extendSession();
  }
}

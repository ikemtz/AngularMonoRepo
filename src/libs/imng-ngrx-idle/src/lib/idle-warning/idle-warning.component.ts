import { Component, OnInit, OnDestroy } from '@angular/core';
import { IdleFacade } from '../+state/idle.facade';
import { BehaviorSubject, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'imng-idle-warning',
  templateUrl: './idle-warning.component.html',
  styleUrls: ['./idle-warning.component.scss']
})
export class IdleWarningComponent implements OnInit, OnDestroy {
  public readonly isSessionTimingOut$ = new BehaviorSubject<boolean>(false);
  private timeoutSub: Subscription;

  constructor(private readonly idleFacade: IdleFacade) {
  }

  ngOnInit(): void {
    this.timeoutSub = this.idleFacade.isTimingOut$.pipe(tap(value => this.isSessionTimingOut$.next(value))).subscribe();
  }

  ngOnDestroy(): void {
    this.timeoutSub?.unsubscribe();
  }
  close(): void {
    this.isSessionTimingOut$.next(false);
  }
  extend(): void {
    this.idleFacade.extendSession();
  }
}

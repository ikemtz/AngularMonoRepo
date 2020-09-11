import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSignalr from './signalr.reducer';
import { signalrSelectors } from './signalr.selectors';

@Injectable()
export class SignalrFacade {
  public readonly isConnected$ = this.store.pipe(select(signalrSelectors.getIsConnected));
  public readonly lastReceivedMessage$ = this.store.pipe(select(signalrSelectors.getLastReceivedMessage));
  public readonly receivedMessages$ = this.store.pipe(select(signalrSelectors.getReceivedMessages));

  constructor(private readonly store: Store<fromSignalr.SignalrPartialState>) {
  }

  public dispatchAction(action: Action): void {
    this.store.dispatch(action);
  }
}

import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromSignalr from './signalr.reducer';
import { signalrSelectors } from './signalr.selectors';

@Injectable()
export class SignalrFacade {
  isConnected$ = this.store.pipe(select(signalrSelectors.getIsConnected));
  lastReceivedMessage$ = this.store.pipe(select(signalrSelectors.getLastReceivedMessage));
  receivedMessages$ = this.store.pipe(select(signalrSelectors.getReceivedMessages));

  constructor(private store: Store<fromSignalr.SignalrPartialState>) {
  }

  dispatchAction(action: Action) {
    this.store.dispatch(action);
  }
}

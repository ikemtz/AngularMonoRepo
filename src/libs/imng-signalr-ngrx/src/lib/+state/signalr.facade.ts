import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { ISignalrMessage } from '../models/signalr.message';
import { signalrActions } from './signalr.actions';

import * as fromSignalr from './signalr.reducer';
import { signalrSelectors } from './signalr.selectors';

@Injectable()
export class SignalrFacade {
  public readonly isConnected$ = this.store.pipe(select(signalrSelectors.getIsConnected));
  public readonly lastReceivedMessage$ = this.store.pipe(select(signalrSelectors.getLastReceivedMessage));
  public readonly receivedMessages$ = this.store.pipe(select(signalrSelectors.getReceivedMessages));

  constructor(private readonly store: Store<fromSignalr.SignalrPartialState>) {}

  public connect(): void {
    this.store.dispatch(signalrActions.connect());
  }
  public sendMessage(payload: ISignalrMessage<unknown>): void {
    this.store.dispatch(signalrActions.sendMessage(payload));
  }
  public clearMessages(): void {
    this.store.dispatch(signalrActions.clearMessages());
  }
}

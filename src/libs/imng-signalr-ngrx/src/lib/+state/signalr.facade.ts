import { Injectable, inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { ISignalrMessage } from '../models/signalr.message';
import { signalrActions } from './signalr.actions';

import { signalrSelectors } from './signalr.selectors';

@Injectable()
export class SignalrFacade {
  private readonly store = inject(Store);

  public readonly isConnected$ = this.store.select(signalrSelectors.selectIsConnected);
  public readonly lastReceivedMessage$ = this.store.select(signalrSelectors.selectLastReceivedMessage);
  public readonly receivedMessages$ = this.store.select(signalrSelectors.selectReceivedMessages);

  public connect(): void {
    this.store.dispatch(signalrActions.connect());
  }
  public sendMessage(payload: ISignalrMessage): void {
    this.store.dispatch(signalrActions.sendMessage(payload));
  }
  public clearMessages(): void {
    this.store.dispatch(signalrActions.clearMessages());
  }
}

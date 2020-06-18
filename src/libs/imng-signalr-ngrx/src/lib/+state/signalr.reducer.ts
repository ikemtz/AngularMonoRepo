import { createReducer, on, Action } from '@ngrx/store';

import * as SignalrActions from './signalr.actions';
import { ISignalrMessage } from '../models/signalr.message';

export const SIGNALR_FEATURE_KEY = 'signalr';

export interface State {
  isConnected: boolean;
  lastReceivedMessage: ISignalrMessage;
  receivedMessages: ISignalrMessage[];
}

export interface SignalrPartialState {
  readonly [SIGNALR_FEATURE_KEY]: State;
}

export const initialState: State = {
  isConnected: false,
  lastReceivedMessage: null,
  receivedMessages: []
};

const signalrReducer = createReducer(
  initialState,
  on(SignalrActions.setConnectionState, (state, action) => ({
    ...state,
    isConnected: action.payload
  })),
  on(SignalrActions.receivedMessage, (state, action) => ({
    ...state,
    receivedMessages: [action.payload, ...state.receivedMessages,],
    lastReceivedMessage: action.payload,
  })),
  on(SignalrActions.clearMessages, (state) => ({
    ...state,
    receivedMessages: [],
    lastReceivedMessage: null
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return signalrReducer(state, action);
}

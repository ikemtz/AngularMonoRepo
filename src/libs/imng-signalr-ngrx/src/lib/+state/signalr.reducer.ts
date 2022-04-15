import { createReducer, on, createFeature } from '@ngrx/store';

import * as SignalrActions from './signalr.actions';
import { ISignalrMessage } from '../models/signalr.message';

export const SIGNALR_FEATURE_KEY = 'signalr';

export interface State {
  isConnected: boolean;
  lastReceivedMessage: ISignalrMessage | undefined;
  receivedMessages: ISignalrMessage[];
}

export const initialState: State = {
  isConnected: false,
  receivedMessages: [],
  lastReceivedMessage: undefined,
};

export const signalrFeature = createFeature({
  name: SIGNALR_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(SignalrActions.setConnectionState,
      (state, action): State => ({
        ...state,
        isConnected: action.payload.isConnected,
      })),
    on(SignalrActions.receivedMessage,
      (state, action): State => ({
        ...state,
        receivedMessages: [action.payload, ...state.receivedMessages],
        lastReceivedMessage: action.payload,
      })),
    on(SignalrActions.clearMessages,
      (state): State => ({
        ...state,
        receivedMessages: [],
        lastReceivedMessage: undefined,
      }))
  )
});

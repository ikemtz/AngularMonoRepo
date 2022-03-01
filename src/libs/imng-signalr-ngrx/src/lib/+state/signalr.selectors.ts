import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SIGNALR_FEATURE_KEY, State, SignalrPartialState } from './signalr.reducer';

export const getSignalrState = createFeatureSelector< State>(SIGNALR_FEATURE_KEY);

export const getReceivedMessages = createSelector(getSignalrState, (state: State) => state.receivedMessages);

export const getLastReceivedMessage = createSelector(getSignalrState, (state: State) => state.lastReceivedMessage);

export const getIsConnected = createSelector(getSignalrState, (state: State) => state.isConnected);

export const signalrSelectors = {
  getSignalrState,
  getReceivedMessages,
  getLastReceivedMessage,
  getIsConnected,
};

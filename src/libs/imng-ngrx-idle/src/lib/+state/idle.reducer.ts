import { Action, createReducer, on } from '@ngrx/store';
import * as idleActions from './idle.actions';

export const IDLE_FEATURE_KEY = 'idle';

export interface IdleState {
  isTimingOut: boolean;
  timeoutSpanInMs?: number;
}

export const initialState: IdleState = {
  isTimingOut: false,
};

export const featureReducer = createReducer(
  initialState,
  on(idleActions.onSessionTimingOut, (state, { payload }) => ({ ...state, isTimingOut: true, timeoutSpanInMs: payload.autoLogoutInMs - payload.timeoutWarningInMs })),
  on(idleActions.onSessionExtended, state => ({ ...state, isTimingOut: false, timeoutSpanInMs: null })),
  on(idleActions.signOutRedirect, state => ({ ...state, isTimingOut: false, timeoutSpanInMs: null }))
);

export function idleReducer(state: IdleState | undefined, action: Action): IdleState {
  return featureReducer(state, action);
}

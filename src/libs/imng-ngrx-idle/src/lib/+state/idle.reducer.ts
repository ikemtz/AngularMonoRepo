import { Action, createReducer, on } from '@ngrx/store';
import * as idleActions from './idle.actions';

export const IDLE_FEATURE_KEY = 'idle';

export interface IdleState {
  isTimingOut: boolean;
}

export const initialState: IdleState = {
  isTimingOut: false,
};

export const featureReducer = createReducer(
  initialState,
  on(idleActions.onSessionTimingOut, state => ({ ...state, isTimingOut: true })),
  on(idleActions.onSessionExtended, state => ({ ...state, isTimingOut: false })),
);

export function idleReducer(state: IdleState | undefined, action: Action): IdleState {
  return featureReducer(state, action);
}

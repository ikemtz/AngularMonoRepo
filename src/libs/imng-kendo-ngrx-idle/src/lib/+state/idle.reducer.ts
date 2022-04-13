import { createFeature, createReducer, on } from '@ngrx/store';
import * as idleActions from './idle.actions';

export const IDLE_FEATURE_KEY = 'idle';

export interface IdleState {
  isTimingOut: boolean;
  timeoutSpanInMs: number | undefined;
}

export const initialState: IdleState = {
  isTimingOut: false,
  timeoutSpanInMs: undefined,
};

export const idleFeature = createFeature({
  name: IDLE_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(idleActions.onSessionTimingOut, (state, { payload }) => ({
      ...state,
      isTimingOut: true,
      timeoutSpanInMs: payload.autoLogoutInMs - payload.timeoutWarningInMs,
    })),
    on(idleActions.onSessionExtended, idleActions.signOutRedirect, (state) => ({
      ...state,
      isTimingOut: false,
      timeoutSpanInMs: undefined,
    })),
  )
});

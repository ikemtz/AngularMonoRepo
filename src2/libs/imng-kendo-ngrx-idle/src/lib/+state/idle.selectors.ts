import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IdleState, IDLE_FEATURE_KEY } from './idle.reducer';

export const selectIdleState = createFeatureSelector<IdleState>(
  IDLE_FEATURE_KEY
);

const selectState = createFeatureSelector<IdleState>(IDLE_FEATURE_KEY);
const getIsTimingOut = createSelector(selectState, (state: IdleState) => state.isTimingOut);

const getTimeoutSpanInMs = createSelector(selectState, (state: IdleState) => state.timeoutSpanInMs);
export const idleQuery = { getIsTimingOut, getTimeoutSpanInMs };

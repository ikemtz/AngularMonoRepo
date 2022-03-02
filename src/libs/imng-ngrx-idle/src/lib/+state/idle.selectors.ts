import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IdleState, IDLE_FEATURE_KEY } from './idle.reducer';

export const selectIdleState = createFeatureSelector<IdleState>(IDLE_FEATURE_KEY);

const selectState = createFeatureSelector<IdleState>(IDLE_FEATURE_KEY);
const getIsTimingOut = createSelector(selectState, (state: IdleState) => state.isTimingOut || false);

const getTimeoutSpanInMs = createSelector(selectState, (state: IdleState) => state.timeoutSpanInMs || 10000);
export const idleQuery = { getIsTimingOut, getTimeoutSpanInMs };

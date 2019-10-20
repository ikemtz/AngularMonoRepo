import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NursesPartialState, NursesState, NURSES_FEATURE_KEY } from '../+state/nurses.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getNursesState = createFeatureSelector<NursesPartialState, NursesState>(NURSES_FEATURE_KEY);
export const getLoading = createSelector(
  getNursesState,
  (state: NursesState) => state.loading,
);
export const getCurrentEntity = createSelector(
  getNursesState,
  state => state.currentNurse,
);
export const getIsEditActive = createSelector(
  getCurrentEntity,
  entity => isTruthy(entity) && isTruthy(entity.id),
);
export const getIsNewActive = createSelector(
  getCurrentEntity,
  entity => isTruthy(entity) && !isTruthy(entity.id),
);
export const queries = {
  getLoading,
  getCurrentEntity,
  getIsEditActive,
  getIsNewActive,
};

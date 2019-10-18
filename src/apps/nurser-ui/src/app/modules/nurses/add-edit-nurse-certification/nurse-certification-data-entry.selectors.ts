import { createSelector } from '@ngrx/store';
import { isTruthy } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { getNursesState, getLoading } from '../add-edit-nurses/nurses-data-entry.selectors';

export const getCurrentNurse = createSelector(
  getNursesState,
  state => state.currentNurse,
);
export const getCurrentEntity = createSelector(
  getNursesState,
  state => state.currentNurseCertification,
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
  getCurrentNurse,
  getCurrentEntity,
  getIsEditActive,
  getIsNewActive,
};

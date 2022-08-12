import { createSelector } from '@ngrx/store';
import { healthItemsFeature } from './health-item.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditHealthItemActive = createSelector(
  healthItemsFeature.selectCurrentHealthItem,
  (entity) => isTruthy(entity) && isTruthy(entity?.id));
const selectIsNewHealthItemActive = createSelector(
  healthItemsFeature.selectCurrentHealthItem,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const dataEntryHealthItemQueries = {
  selectCurrentHealthItem: healthItemsFeature.selectCurrentHealthItem,
  selectIsEditHealthItemActive,
  selectIsNewHealthItemActive,
};

export const healthItemQueries = { ...dataEntryHealthItemQueries };


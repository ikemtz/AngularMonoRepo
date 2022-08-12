import { createSelector } from '@ngrx/store';
import { unitsFeature } from './unit.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditUnitActive = createSelector(
  unitsFeature.selectCurrentUnit,
  (entity) => isTruthy(entity) && isTruthy(entity?.id));
const selectIsNewUnitActive = createSelector(
  unitsFeature.selectCurrentUnit,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const dataEntryUnitQueries = {
  selectCurrentUnit: unitsFeature.selectCurrentUnit,
  selectIsEditUnitActive,
  selectIsNewUnitActive,
};

export const unitQueries = { ...dataEntryUnitQueries };


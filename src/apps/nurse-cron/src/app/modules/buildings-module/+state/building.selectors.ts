import { createSelector } from '@ngrx/store';
import { buildingsFeature } from './building.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditBuildingActive = createSelector(
  buildingsFeature.selectCurrentBuilding,
  (entity) => isTruthy(entity) && isTruthy(entity?.id));
const selectIsNewBuildingActive = createSelector(
  buildingsFeature.selectCurrentBuilding,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const dataEntryBuildingQueries = {
  selectCurrentBuilding: buildingsFeature.selectCurrentBuilding,
  selectIsEditBuildingActive,
  selectIsNewBuildingActive,
};

export const buildingQueries = { ...dataEntryBuildingQueries };


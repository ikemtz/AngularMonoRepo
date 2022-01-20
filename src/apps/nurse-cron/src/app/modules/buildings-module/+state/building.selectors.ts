import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BUILDINGS_FEATURE_KEY, State } from './building.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getBuildingsState = createFeatureSelector<State>(BUILDINGS_FEATURE_KEY);

const getBuildings = createSelector(getBuildingsState, (state) => state.gridData);
const getLoading = createSelector(getBuildingsState, (state) => state.loading);
const getGridODataState = createSelector(getBuildingsState, (state) => state.gridODataState);
const getPagerSettings = createSelector(getBuildingsState, (state) => state.gridPagerSettings);
export const odataGridBuildingQueries = {
  getBuildings,
  getLoading,
  getGridODataState,
  getPagerSettings,
};

const getCurrentBuilding = createSelector(getBuildingsState, (state) => state.currentBuilding);
const getIsEditBuildingActive = createSelector(getCurrentBuilding, (entity) => isTruthy(entity) && isTruthy(entity.id));
const getIsNewBuildingActive = createSelector(getCurrentBuilding, (entity) => isTruthy(entity) && !isTruthy(entity.id));
export const dataEntryBuildingQueries = {
  getCurrentBuilding,
  getIsEditBuildingActive,
  getIsNewBuildingActive,
};

export const buildingQueries = { ...odataGridBuildingQueries, ...dataEntryBuildingQueries };

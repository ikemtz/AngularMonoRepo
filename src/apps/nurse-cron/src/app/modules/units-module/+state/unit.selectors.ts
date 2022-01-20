import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UNITS_FEATURE_KEY, State } from './unit.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getUnitsState = createFeatureSelector<State>(UNITS_FEATURE_KEY);

const getUnits = createSelector(getUnitsState, (state) => state.gridData);
const getLoading = createSelector(getUnitsState, (state) => state.loading);
const getGridODataState = createSelector(getUnitsState, (state) => state.gridODataState);
const getPagerSettings = createSelector(getUnitsState, (state) => state.gridPagerSettings);
export const odataGridUnitQueries = {
  getUnits,
  getLoading,
  getGridODataState,
  getPagerSettings,
};

const getCurrentUnit = createSelector(getUnitsState, (state) => state.currentUnit);
const getIsEditUnitActive = createSelector(getCurrentUnit, (entity) => isTruthy(entity) && isTruthy(entity.id));
const getIsNewUnitActive = createSelector(getCurrentUnit, (entity) => isTruthy(entity) && !isTruthy(entity.id));
export const dataEntryUnitQueries = {
  getCurrentUnit,
  getIsEditUnitActive,
  getIsNewUnitActive,
};

export const unitQueries = { ...odataGridUnitQueries, ...dataEntryUnitQueries };

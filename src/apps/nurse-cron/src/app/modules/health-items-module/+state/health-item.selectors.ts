import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HEALTH_ITEMS_FEATURE_KEY, State } from './health-item.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getHealthItemsState = createFeatureSelector<State>(HEALTH_ITEMS_FEATURE_KEY);

const getHealthItems = createSelector(getHealthItemsState, (state) => state.gridData);
const getLoading = createSelector(getHealthItemsState, (state) => state.loading);
const getGridODataState = createSelector(getHealthItemsState, (state) => state.gridODataState);
const getPagerSettings = createSelector(getHealthItemsState, (state) => state.gridPagerSettings);
export const odataGridHealthItemQueries = {
  getHealthItems,
  getLoading,
  getGridODataState,
  getPagerSettings,
};

const getCurrentHealthItem = createSelector(getHealthItemsState, (state) => state.currentHealthItem);
const getIsEditHealthItemActive = createSelector(
  getCurrentHealthItem,
  (entity) => isTruthy(entity) && isTruthy(entity.id),
);
const getIsNewHealthItemActive = createSelector(
  getCurrentHealthItem,
  (entity) => isTruthy(entity) && !isTruthy(entity.id),
);
export const dataEntryHealthItemQueries = {
  getCurrentHealthItem,
  getIsEditHealthItemActive,
  getIsNewHealthItemActive,
};

export const healthItemQueries = { ...odataGridHealthItemQueries, ...dataEntryHealthItemQueries };

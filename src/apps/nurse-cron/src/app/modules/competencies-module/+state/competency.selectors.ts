import { createFeatureSelector, createSelector } from '@ngrx/store';
import { COMPETENCIES_FEATURE_KEY, State, CompetenciesPartialState } from './competency.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getCompetenciesState = createFeatureSelector< State>(
  COMPETENCIES_FEATURE_KEY,
); 

const getCompetencies = createSelector(getCompetenciesState, state => state.gridData);
const getLoading = createSelector(getCompetenciesState, state => state.loading);
const getGridODataState = createSelector(getCompetenciesState, state => state.gridODataState);
const getPagerSettings = createSelector(getCompetenciesState, state => state.gridPagerSettings);
export const odataGridCompetencyQueries = {
  getCompetencies,
  getLoading,
  getGridODataState,
  getPagerSettings,
};

const getCurrentCompetency = createSelector(
  getCompetenciesState,
  state => state.currentCompetency,
);
const getIsEditCompetencyActive = createSelector(
  getCurrentCompetency,
  entity => isTruthy(entity) && isTruthy(entity.id),
);
const getIsNewCompetencyActive = createSelector(
  getCurrentCompetency,
  entity => isTruthy(entity) && !isTruthy(entity.id),
);
export const dataEntryCompetencyQueries = {
  getCurrentCompetency,
  getIsEditCompetencyActive,
  getIsNewCompetencyActive,
};

export const competencyQueries = { ...odataGridCompetencyQueries, ...dataEntryCompetencyQueries };


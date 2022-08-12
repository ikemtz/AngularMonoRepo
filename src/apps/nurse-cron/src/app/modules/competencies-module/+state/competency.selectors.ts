import { createSelector } from '@ngrx/store';
import { competenciesFeature } from './competency.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditCompetencyActive = createSelector(
  competenciesFeature.selectCurrentCompetency,
  (entity) => isTruthy(entity) && isTruthy(entity?.id));
const selectIsNewCompetencyActive = createSelector(
  competenciesFeature.selectCurrentCompetency,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const dataEntryCompetencyQueries = {
  selectCurrentCompetency: competenciesFeature.selectCurrentCompetency,
  selectIsEditCompetencyActive,
  selectIsNewCompetencyActive,
};

export const competencyQueries = { ...dataEntryCompetencyQueries };


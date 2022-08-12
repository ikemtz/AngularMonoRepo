import { createSelector } from '@ngrx/store';
import { certificationsFeature } from './certification.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditCertificationActive = createSelector(
  certificationsFeature.selectCurrentCertification,
  (entity) => isTruthy(entity) && isTruthy(entity?.id));
const selectIsNewCertificationActive = createSelector(
  certificationsFeature.selectCurrentCertification,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const dataEntryCertificationQueries = {
  selectCurrentCertification: certificationsFeature.selectCurrentCertification,
  selectIsEditCertificationActive,
  selectIsNewCertificationActive,
};

export const certificationQueries = { ...dataEntryCertificationQueries };


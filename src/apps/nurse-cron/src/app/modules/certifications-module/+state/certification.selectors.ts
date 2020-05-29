import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CERTIFICATIONS_FEATURE_KEY, State, CertificationsPartialState } from './certification.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getCertificationsState = createFeatureSelector<CertificationsPartialState, State>(
  CERTIFICATIONS_FEATURE_KEY,
); 

const getCertifications = createSelector(getCertificationsState, state => state.gridData);
const getLoading = createSelector(getCertificationsState, state => state.loading);
const getGridODataState = createSelector(getCertificationsState, state => state.gridODataState);
const getPagerSettings = createSelector(getCertificationsState, state => state.gridPagerSettings);
export const odataGridCertificationQueries = {
  getCertifications,
  getLoading,
  getGridODataState,
  getPagerSettings,
};

const getCurrentCertification = createSelector(
  getCertificationsState,
  state => state.currentCertification,
);
const getIsEditCertificationActive = createSelector(
  getCurrentCertification,
  entity => isTruthy(entity) && isTruthy(entity.id),
);
const getIsNewCertificationActive = createSelector(
  getCurrentCertification,
  entity => isTruthy(entity) && !isTruthy(entity.id),
);
export const dataEntryCertificationQueries = {
  getCurrentCertification,
  getIsEditCertificationActive,
  getIsNewCertificationActive,
};

export const certificationQueries = { ...odataGridCertificationQueries, ...dataEntryCertificationQueries };


import { createReducer, on, Action } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';

import * as certificationActionTypes from './certification.actions';
import { ICertification } from '../../../models/certifications-odata';
export const CERTIFICATIONS_FEATURE_KEY = 'certifications';

export interface State extends KendoODataGridState<ICertification> {
  currentCertification?: ICertification;
}

export interface CertificationsPartialState {
  readonly [CERTIFICATIONS_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  loading: false,
};

const certificationsReducer = createReducer(
  initialState,
  on(certificationActionTypes.certificationsFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  on(certificationActionTypes.loadCertificationsRequest, (state, { payload }) => ({
    ...state,
    gridODataState: payload,
    loading: true,
    error: null,
  })),
  on(
    certificationActionTypes.reloadCertificationsSuccess,
    certificationActionTypes.loadCertificationsSuccess,
    (state, { payload }) => ({
      ...state,
      loading: false,
      gridPagerSettings: getODataPagerSettings({
        gridData: payload,
        gridODataState: state.gridODataState,
      }),
      gridData: payload,
      error: null,
    }),
  ),

  on(certificationActionTypes.setCurrentCertification, (state, { payload }) => ({
    ...state,
    currentCertification: payload,
  })),
  on(certificationActionTypes.clearCurrentCertification, (state) => ({ ...state, currentCertification: null })),
  on(
    certificationActionTypes.saveCertificationRequest,
    certificationActionTypes.updateCertificationRequest,
    certificationActionTypes.deleteCertificationRequest,
    (state) => ({
      ...state,
      loading: true,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return certificationsReducer(state, action);
}

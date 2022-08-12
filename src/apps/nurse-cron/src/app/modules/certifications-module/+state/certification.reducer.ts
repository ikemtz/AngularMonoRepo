import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import { ICertification } from '../../../models/certifications-odata';

import * as certificationActionTypes from './certification.actions';
export const CERTIFICATIONS_FEATURE_KEY = 'certifications';

export interface State extends KendoODataGridState<ICertification> {
  currentCertification: ICertification | undefined;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentCertification: undefined,
  loading: true,
};

export const certificationsFeature = createFeature({
  name: CERTIFICATIONS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(certificationActionTypes.loadCertificationsRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(certificationActionTypes.loadCertificationsSuccess,
      certificationActionTypes.reloadCertificationsSuccess,
      (state, { payload }): State => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null,
      })),
    on(certificationActionTypes.setCurrentCertification,
      (state, { payload }): State =>
        ({ ...state, currentCertification: payload })),
    on(certificationActionTypes.clearCurrentCertification,
      (state): State => ({ ...state, currentCertification: undefined })),
    on(certificationActionTypes.saveCertificationRequest,
      certificationActionTypes.updateCertificationRequest,
      certificationActionTypes.deleteCertificationRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});

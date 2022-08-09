import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import { ICompetency } from '../../../models/competencies-odata';

import * as competencyActionTypes from './competency.actions';
export const COMPETENCIES_FEATURE_KEY = 'competencies';

export interface State extends KendoODataGridState<ICompetency> {
  currentCompetency: ICompetency | undefined;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentCompetency: undefined,
  loading: true,
};

export const competenciesFeature = createFeature({
  name: COMPETENCIES_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(competencyActionTypes.loadCompetenciesRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(competencyActionTypes.loadCompetenciesSuccess,
      competencyActionTypes.reloadCompetenciesSuccess,
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
    on(competencyActionTypes.setCurrentCompetency,
      (state, { payload }): State =>
        ({ ...state, currentCompetency: payload })),
    on(competencyActionTypes.clearCurrentCompetency,
      (state): State => ({ ...state, currentCompetency: undefined })),
    on(competencyActionTypes.saveCompetencyRequest,
      competencyActionTypes.updateCompetencyRequest,
      competencyActionTypes.deleteCompetencyRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});

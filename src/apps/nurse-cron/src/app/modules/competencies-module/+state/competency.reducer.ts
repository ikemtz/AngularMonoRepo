import { createReducer, on, Action } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';

import * as competencyActionTypes from './competency.actions';
import { ICompetency } from '../../../models/competencies-odata';
export const COMPETENCIES_FEATURE_KEY = 'competencies';

export interface State extends KendoODataGridState<ICompetency> {
  currentCompetency?: ICompetency;
}

export interface CompetenciesPartialState {
  readonly [COMPETENCIES_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  loading: false,
};

const competenciesReducer = createReducer(
  initialState,
  on(competencyActionTypes.competenciesFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  on(competencyActionTypes.loadCompetenciesRequest, (state, { payload }) => ({
    ...state,
    gridODataState: payload,
    loading: true,
    error: null,
  })),
  on(competencyActionTypes.loadCompetenciesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    gridPagerSettings: getODataPagerSettings({
      gridData: payload,
      gridODataState: state.gridODataState,
    }),
    gridData: payload,
    error: null,
  })),

  on(competencyActionTypes.setCurrentCompetency, (state, { payload }) => ({ ...state, currentCompetency: payload })),
  on(competencyActionTypes.clearCurrentCompetency, state => ({ ...state, currentCompetency: null })),
  on(
    competencyActionTypes.saveCompetencyRequest,
    competencyActionTypes.updateCompetencyRequest,
    competencyActionTypes.deleteCompetencyRequest,
    state => ({
      ...state,
      loading: true,
    }),
  ),


);

export function reducer(state: State | undefined, action: Action) {
  return competenciesReducer(state, action);
}

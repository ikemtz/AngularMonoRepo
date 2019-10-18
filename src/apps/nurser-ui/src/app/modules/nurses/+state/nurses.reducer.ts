import { createReducer, on, Action } from '@ngrx/store';
import * as NursesActions from './nurses.actions';
import { KendoODataGridState, createKendoODataGridInitialState } from 'imng-kendo-grid-odata';
import { IEmployee, IEmployeeCertification } from '../../models/emp-api';

export const NURSES_FEATURE_KEY = 'nurses';

export interface NursesState extends KendoODataGridState<IEmployee> {
  currentNurse?: IEmployee;
  currentNurseCertification?: IEmployeeCertification;
}

export interface NursesPartialState {
  readonly [NURSES_FEATURE_KEY]: NursesState;
}

export const initialState: NursesState = { ...createKendoODataGridInitialState<IEmployee>() };

const nursesReducer = createReducer(
  initialState,
  on(NursesActions.loadNursesRequest, (state, { payload }) => ({
    ...state,
    gridODataState: payload,
    loading: true,
    error: null,
  })),
  on(NursesActions.loadNursesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    gridData: payload,
    error: null,
  })),
  on(NursesActions.loadNursesFailure, (state, { payload }) => ({ ...state, error: payload.error })),
  on(NursesActions.setCurrentNurseItem, (state, { payload }) => ({ ...state, currentNurse: payload })),
  on(NursesActions.clearCurrentNurseItem, state => ({ ...state, currentNurse: null })),
  on(NursesActions.saveNurseRequest, NursesActions.updateNurseRequest, NursesActions.deleteNurseRequest, state => ({
    ...state,
    loading: true,
  })),
  on(NursesActions.setCurrentNurseCertificationItem, (state, { payload }) => ({
    ...state,
    currentNurseCertification: payload.certification,
    currentNurse: payload.nurse,
  })),
  on(NursesActions.clearCurrentNurseCertificationItem, state => ({
    ...state,
    currentNurseCertification: null,
    currentNurse: null,
  })),
  on(
    NursesActions.saveNurseCertificationRequest,
    NursesActions.updateNurseCertificationRequest,
    NursesActions.deleteNurseCertificationRequest,
    state => ({
      ...state,
      loading: true,
    }),
  ),
);

export function reducer(state: NursesState | undefined, action: Action) {
  return nursesReducer(state, action);
}

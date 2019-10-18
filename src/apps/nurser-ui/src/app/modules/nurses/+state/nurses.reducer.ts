import { createReducer, on, Action } from '@ngrx/store';
import * as NursesActions from './nurses.actions';
import { KendoODataGridState, createKendoODataGridInitialState } from 'imng-kendo-grid-odata';
import { IEmployee } from '../../models/emp-api';

export const NURSES_FEATURE_KEY = 'nurses';

export interface NursesState extends KendoODataGridState<IEmployee> {
  currentNurse?: IEmployee;
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
);

export function reducer(state: NursesState | undefined, action: Action) {
  return nursesReducer(state, action);
}

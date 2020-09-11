import { createReducer, on, Action } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';

import * as employeeActionTypes from './employee.actions';
import { IEmployee } from '../../../models/employees-odata';
export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface State extends KendoODataGridState<IEmployee> {
  currentEmployee?: IEmployee;
}

export interface EmployeesPartialState {
  readonly [EMPLOYEES_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  loading: false,
};

const employeesReducer = createReducer(
  initialState,
  on(employeeActionTypes.employeesFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  on(employeeActionTypes.loadEmployeesRequest, (state, { payload }) => ({
    ...state,
    gridODataState: payload,
    loading: true,
    error: null,
  })),
  on(employeeActionTypes.loadEmployeesSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    gridPagerSettings: getODataPagerSettings({
      gridData: payload,
      gridODataState: state.gridODataState,
    }),
    gridData: payload,
    error: null,
  })),

  on(employeeActionTypes.setCurrentEmployee, (state, { payload }) => ({ ...state, currentEmployee: payload })),
  on(employeeActionTypes.clearCurrentEmployee, state => ({ ...state, currentEmployee: null })),
  on(
    employeeActionTypes.saveEmployeeRequest,
    employeeActionTypes.updateEmployeeRequest,
    employeeActionTypes.deleteEmployeeRequest,
    state => ({
      ...state,
      loading: true,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return employeesReducer(state, action);
}

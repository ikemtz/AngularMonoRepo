import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';

import * as employeeActionTypes from './employee.actions';
import { IEmployee,  } from '../../../models/employees-api';

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface State extends KendoODataGridState<IEmployee> {
  currentEmployee: IEmployee | undefined;
  currentEmployeeModalState: string | undefined;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentEmployee: undefined,
  currentEmployeeModalState: undefined,
  loading: true,
};

export const employeesFeature = createFeature({
  name: EMPLOYEES_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(employeeActionTypes.loadEmployeesRequest,
      (state, { payload }) : State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null, })),
    on(employeeActionTypes.loadEmployeesSuccess,
      employeeActionTypes.reloadEmployeesSuccess,
      (state, { payload }) : State => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null, })),
    on(employeeActionTypes.setCurrentEmployee,
      (state, { payload }) : State =>
        ({ ...state,
        currentEmployeeModalState: payload.modalState,
        currentEmployee: payload.entity })),
    on(employeeActionTypes.clearCurrentEmployee,
      (state) : State => ({
        ...state, 
        currentEmployee: undefined,
        currentEmployeeModalState: undefined,
      })),
    on(employeeActionTypes.saveEmployeeRequest,
      employeeActionTypes.updateEmployeeRequest,
      employeeActionTypes.deleteEmployeeRequest,
      (state) : State => ({
        ...state,
        loading: true,
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});

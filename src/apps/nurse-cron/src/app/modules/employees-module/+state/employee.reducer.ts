import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import { IEmployee } from '../../../models/employees-odata';

import * as employeeActionTypes from './employee.actions';
export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface State extends KendoODataGridState<IEmployee> {
  currentEmployee: IEmployee | undefined;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentEmployee: undefined,
  loading: true,
};

export const employeesFeature = createFeature({
  name: EMPLOYEES_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(employeeActionTypes.loadEmployeesRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(employeeActionTypes.loadEmployeesSuccess,
      employeeActionTypes.reloadEmployeesSuccess,
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
    on(employeeActionTypes.setCurrentEmployee,
      (state, { payload }): State =>
        ({ ...state, currentEmployee: payload })),
    on(employeeActionTypes.clearCurrentEmployee,
      (state): State => ({ ...state, currentEmployee: undefined })),
    on(employeeActionTypes.saveEmployeeRequest,
      employeeActionTypes.updateEmployeeRequest,
      employeeActionTypes.deleteEmployeeRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});

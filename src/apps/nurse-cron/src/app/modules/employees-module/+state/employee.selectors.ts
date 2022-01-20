import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EMPLOYEES_FEATURE_KEY, State } from './employee.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getEmployeesState = createFeatureSelector<State>(EMPLOYEES_FEATURE_KEY);

const getEmployees = createSelector(getEmployeesState, (state) => state.gridData);
const getLoading = createSelector(getEmployeesState, (state) => state.loading);
const getGridODataState = createSelector(getEmployeesState, (state) => state.gridODataState);
const getPagerSettings = createSelector(getEmployeesState, (state) => state.gridPagerSettings);
export const odataGridEmployeeQueries = {
  getEmployees,
  getLoading,
  getGridODataState,
  getPagerSettings,
};

const getCurrentEmployee = createSelector(getEmployeesState, (state) => state.currentEmployee);
const getIsEditEmployeeActive = createSelector(getCurrentEmployee, (entity) => isTruthy(entity) && isTruthy(entity.id));
const getIsNewEmployeeActive = createSelector(getCurrentEmployee, (entity) => isTruthy(entity) && !isTruthy(entity.id));
export const dataEntryEmployeeQueries = {
  getCurrentEmployee,
  getIsEditEmployeeActive,
  getIsNewEmployeeActive,
};

export const employeeQueries = { ...odataGridEmployeeQueries, ...dataEntryEmployeeQueries };

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EMPLOYEES_FEATURE_KEY, EmployeesState } from './employees.reducer';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { isTruthy } from '@progress/kendo-angular-grid/dist/es2015/utils';
import { getODataPagerSettings } from '@imko/kendo-grid-odata';

// Lookup the 'Employees' feature state managed by NgRx
const getEmployeesState = createFeatureSelector<EmployeesState>(EMPLOYEES_FEATURE_KEY);

const getLoading = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.loading
);

const getError = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.error
);

const getGridDataResult = createSelector(
  getEmployeesState,
  (state: EmployeesState) => {
    return state.dataResult;
  }
);

const getGridRowCount = createSelector(
  getGridDataResult,
  getLoading,
  (result: GridDataResult, isLoading) => {
    return !isLoading ? result.total : 0;
  }
);

const getGridODataState = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.gridODataState
);

const getPagerSettings = createSelector(
  getEmployeesState,
  (state: EmployeesState) => getODataPagerSettings(state)
);

const getCurrentEntity = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.currentEntity
);

const getCurrentEntityHasValue = createSelector(
  getEmployeesState,
  (state: EmployeesState) => isTruthy(state.currentEntity)
);

const getCurrentCertificationHasValue = createSelector(
  getEmployeesState,
  (state: EmployeesState) => isTruthy(state.currentCertification)
);

const getCurrentCertification = createSelector(
  getEmployeesState,
  (state: EmployeesState) => state.currentCertification
);

export const employeesQuery = {
  getLoading,
  getError,
  getGridDataResult,
  getGridRowCount,
  getGridODataState,
  getPagerSettings,
  getCurrentEntity,
  getCurrentEntityHasValue,
  getCurrentCertification,
  getCurrentCertificationHasValue,
};

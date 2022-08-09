import { createSelector } from '@ngrx/store';
import { employeesFeature } from './employee.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditEmployeeActive = createSelector(
  employeesFeature.selectCurrentEmployee,
  (entity) => isTruthy(entity) && isTruthy(entity?.id));
const selectIsNewEmployeeActive = createSelector(
  employeesFeature.selectCurrentEmployee,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const dataEntryEmployeeQueries = {
  selectCurrentEmployee: employeesFeature.selectCurrentEmployee,
  selectIsEditEmployeeActive,
  selectIsNewEmployeeActive,
};

export const employeeQueries = { ...dataEntryEmployeeQueries };


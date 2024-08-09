import { createSelector } from '@ngrx/store';
import { employeesFeature } from './employee.feature';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditEmployeeActive = createSelector(
  employeesFeature.selectCurrentEmployee,
  (entity) => isTruthy(entity?.id));
const selectIsNewEmployeeActive = createSelector(
  employeesFeature.selectCurrentEmployee,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const employeeSelectors = {
  selectIsEditEmployeeActive,
  selectIsNewEmployeeActive,
};



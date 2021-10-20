import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IEmployee } from '../../../models/employees-odata';

export const employeesFailure = createPayloadAction<{ error: unknown }>('[Employees] Employees Failure'); //NOSONAR

export const loadEmployeesRequest = createPayloadAction<ODataState>('[Employees] Load Employees Request');
export const loadEmployeesSuccess = createPayloadAction<ODataResult<IEmployee>>('[Employees] Load Employees Success');
export const reloadEmployeesRequest = createAction('[Employees] Reload Employees Request');
export const reloadEmployeesSuccess = createPayloadAction<ODataResult<IEmployee>>(
  '[Employees] Reload Employees Success',
);
export const clearCurrentEmployee = createAction('[Employees] Clear Current Employee');
export const setCurrentEmployee = createPayloadAction<IEmployee>('[Employees] Set Current Employee');
export const saveEmployeeRequest = createPayloadAction<IEmployee>('[Employees] Save Employee Request');
export const updateEmployeeRequest = createPayloadAction<IEmployee>('[Employees] Update Employee Request');
export const deleteEmployeeRequest = createPayloadAction<IEmployee>('[Employees] Delete Employee Request');

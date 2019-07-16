import { createAction, props } from '@ngrx/store';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { ODataGridState } from '@imko/kendo-grid-odata';
import { IEmployee, IEmployeeCertification } from '../../models/emp-odata';

export enum EmployeesActionTypes {
  LoadEntities = '[Employees] LoadEntities',
  EntitiesLoaded = '[Employees] EntitiesLoaded',
  EntityError = '[Employees] Load Error',
  AddEditEntity = '[Employees] AddEditEntity',
  ClearCurrentEntity = '[Employees] ClearCurrentEntity',
  SaveEntityRequest = '[Employees] SaveEntityRequest',
  SaveEntitySuccess = '[Employees] SaveEntitySuccess',
  AddEditCertification = "[Employees] AddEditCertification",
  ClearCurrentCertification = "[Employees] ClearCurrentCertification",
  SaveCertificationRequest = "[Employees] SaveCertificationRequest",
  SaveCertificationSuccess = "[Employees] SaveCertificationSuccess"
}

export const loadEntities = createAction(EmployeesActionTypes.LoadEntities, props<ODataGridState>());
export const entityError = createAction(EmployeesActionTypes.EntityError, props());
export const entitiesLoaded = createAction(EmployeesActionTypes.EntitiesLoaded, props<GridDataResult>());
export const addEditEntity = createAction(EmployeesActionTypes.AddEditEntity, props<IEmployee>());
export const clearCurrentEntity = createAction(EmployeesActionTypes.ClearCurrentEntity);
export const saveEntityRequest = createAction(EmployeesActionTypes.SaveEntityRequest, props<IEmployee>());
export const saveEntitySuccess = createAction(EmployeesActionTypes.SaveEntitySuccess, props<IEmployee>());
export const addEditCertification = createAction(EmployeesActionTypes.AddEditCertification, props<{ employee: IEmployee, certification: IEmployeeCertification }>());
export const clearCurrentCertification = createAction(EmployeesActionTypes.ClearCurrentCertification);
export const saveCertificationRequest = createAction(EmployeesActionTypes.SaveCertificationRequest, props<IEmployee>());
export const saveCertificationSuccess = createAction(EmployeesActionTypes.SaveCertificationSuccess, props<IEmployee>());

export const employeesActions = {
  loadEntities,
  entitiesLoaded,
  entityError,
  addEditEntity,
  clearCurrentEntity,
  saveEntityRequest,
  saveEntitySuccess,
  addEditCertification,
  clearCurrentCertification,
  saveCertificationRequest,
  saveCertificationSuccess
};

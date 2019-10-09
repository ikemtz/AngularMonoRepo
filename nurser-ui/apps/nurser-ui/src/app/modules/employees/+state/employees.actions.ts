import { createAction, props } from '@ngrx/store';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { IEmployee, IEmployeeCertification } from '../../models/emp-odata';
import { ODataState } from '@nurser-ui/imng-kendo-odata';

export enum EmployeesActionTypes {
  LoadEntities = '[Employees] LoadEntities',
  EntitiesLoaded = '[Employees] EntitiesLoaded',
  EntityError = '[Employees] Load Error',
  AddEditEntity = '[Employees] AddEditEntity',
  ClearCurrentEntity = '[Employees] ClearCurrentEntity',
  SaveEntityRequest = '[Employees] SaveEntityRequest',
  SaveEntitySuccess = '[Employees] SaveEntitySuccess',
  AddEditCertification = '[Employees] AddEditCertification',
  ClearCurrentCertification = '[Employees] ClearCurrentCertification',
  SaveCertificationRequest = '[Employees] SaveCertificationRequest',
  SaveCertificationSuccess = '[Employees] SaveCertificationSuccess',
}

export const loadEntities = createAction(EmployeesActionTypes.LoadEntities, props<{ payload: ODataState }>());
export const entityError = createAction(EmployeesActionTypes.EntityError, props());
export const entitiesLoaded = createAction(EmployeesActionTypes.EntitiesLoaded, props<{ payload: GridDataResult }>());
export const addEditEntity = createAction(EmployeesActionTypes.AddEditEntity, props<{ payload: IEmployee }>());
export const clearCurrentEntity = createAction(EmployeesActionTypes.ClearCurrentEntity);
export const saveEntityRequest = createAction(EmployeesActionTypes.SaveEntityRequest, props<{ payload: IEmployee }>());
export const saveEntitySuccess = createAction(EmployeesActionTypes.SaveEntitySuccess, props<{ payload: IEmployee }>());
export const addEditCertification = createAction(
  EmployeesActionTypes.AddEditCertification,
  props<{ payload: { employee: IEmployee; certification: IEmployeeCertification } }>(),
);
export const clearCurrentCertification = createAction(EmployeesActionTypes.ClearCurrentCertification);
export const saveCertificationRequest = createAction(
  EmployeesActionTypes.SaveCertificationRequest,
  props<{ payload: IEmployee }>(),
);
export const saveCertificationSuccess = createAction(
  EmployeesActionTypes.SaveCertificationSuccess,
  props<{ payload: IEmployee }>(),
);

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
  saveCertificationSuccess,
};

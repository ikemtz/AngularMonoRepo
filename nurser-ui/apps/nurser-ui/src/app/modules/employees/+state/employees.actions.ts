import { Action } from '@ngrx/store';
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

export class LoadEntities implements Action {
  readonly type = EmployeesActionTypes.LoadEntities;
  constructor(public payload: ODataGridState) { }
}

export class EntityError implements Action {
  readonly type = EmployeesActionTypes.EntityError;
  constructor(public payload: any) { }
}

export class EntitiesLoaded implements Action {
  readonly type = EmployeesActionTypes.EntitiesLoaded;
  constructor(public payload: GridDataResult) { }
}

export class AddEditEntity implements Action {
  readonly type = EmployeesActionTypes.AddEditEntity;
  constructor(public payload: IEmployee) { }
}
export class ClearCurrentEntity implements Action {
  readonly type = EmployeesActionTypes.ClearCurrentEntity;
  constructor() { }
}
export class SaveEntityRequest implements Action {
  readonly type = EmployeesActionTypes.SaveEntityRequest;
  constructor(public payload: IEmployee) { }
}
export class SaveEntitySuccess implements Action {
  readonly type = EmployeesActionTypes.SaveEntitySuccess;
  constructor(public payload: IEmployee) { }
}


export class AddEditCertification implements Action {
  readonly type = EmployeesActionTypes.AddEditCertification;
  constructor(public payload: { employee: IEmployee, certification: IEmployeeCertification }) { }
}
export class ClearCurrentCertification implements Action {
  readonly type = EmployeesActionTypes.ClearCurrentCertification;
  constructor() { }
}
export class SaveCertificationRequest implements Action {
  readonly type = EmployeesActionTypes.SaveCertificationRequest;
  constructor(public payload: IEmployee) { }
}
export class SaveCertificationSuccess implements Action {
  readonly type = EmployeesActionTypes.SaveCertificationSuccess;
  constructor(public payload: IEmployee) { }
}

export type EmployeesAction = LoadEntities | EntitiesLoaded | EntityError |
  AddEditEntity | ClearCurrentEntity | SaveEntityRequest | SaveEntitySuccess |
  AddEditCertification | ClearCurrentCertification | SaveCertificationRequest | SaveCertificationSuccess;

export const fromEmployeesActions = {
  LoadEntities,
  EntitiesLoaded,
  EntityError,
  AddEditEntity,
  ClearCurrentEntity,
  SaveEntityRequest,
  SaveEntitySuccess,
  AddEditCertification,
  ClearCurrentCertification,
  SaveCertificationRequest,
  SaveCertificationSuccess
};

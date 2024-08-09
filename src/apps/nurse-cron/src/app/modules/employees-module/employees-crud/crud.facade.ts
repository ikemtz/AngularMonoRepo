import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { employeesFeature, employeeSelectors, employeeActionTypes } from '../+state';
import { IEmployee } from '../../../models/employees-api';

@Injectable()
export class EmployeeCrudFacade implements IDataEntryFacade<IEmployee> {
  loading$ = this.store.select(employeesFeature.selectLoading);
  currentEntity$ = this.store.select(employeesFeature.selectCurrentEmployee);
  isEditActive$ = this.store.select(employeeSelectors.selectIsEditEmployeeActive);
  isNewActive$ = this.store.select(employeeSelectors.selectIsNewEmployeeActive);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: IEmployee): void {
    this.store.dispatch(employeeActionTypes.setCurrentEmployee(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(employeeActionTypes.clearCurrentEmployee());
  }

  public saveNewEntity(item: IEmployee): void {
    this.store.dispatch(employeeActionTypes.saveEmployeeRequest(item));
  }

  public updateExistingEntity(item: IEmployee): void {
    this.store.dispatch(employeeActionTypes.updateEmployeeRequest(item));
  }

}

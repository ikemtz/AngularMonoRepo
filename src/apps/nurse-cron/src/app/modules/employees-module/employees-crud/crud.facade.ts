import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { employeesFeature } from '../+state/employee.reducer';
import { employeeQueries } from '../+state/employee.selectors';
import * as employeeActionTypes from '../+state/employee.actions';
import { IEmployee } from '../../../models/employees-odata';

@Injectable()
export class EmployeeCrudFacade implements IDataEntryFacade<IEmployee> {
  loading$ = this.store.select(employeesFeature.selectLoading);
  currentEntity$ = this.store.select(employeeQueries.selectCurrentEmployee);
  isEditActive$ = this.store.select(employeeQueries.selectIsEditEmployeeActive);
  isNewActive$ = this.store.select(employeeQueries.selectIsNewEmployeeActive);

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

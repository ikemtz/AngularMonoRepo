import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ODataState } from 'imng-kendo-odata';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { EmployeesPartialState } from '../+state/employee.reducer';
import { employeeQueries } from '../+state/employee.selectors';
import * as employeeActionTypes from '../+state/employee.actions';
import { IEmployee } from '../../../models/employees-odata';

@Injectable()
export class EmployeeCrudFacade implements IDataEntryFacade<IEmployee> {
  loading$ = this.store.pipe(select(employeeQueries.getLoading));
  currentEntity$ = this.store.pipe(select(employeeQueries.getCurrentEmployee));
  isEditActive$ = this.store.pipe(select(employeeQueries.getIsEditEmployeeActive));
  isNewActive$ = this.store.pipe(select(employeeQueries.getIsNewEmployeeActive));

  constructor(private readonly store: Store<EmployeesPartialState>) {}
  loadEntities(state: ODataState): void {}
  setCurrentEntity(item: IEmployee): void {
    this.store.dispatch(employeeActionTypes.setCurrentEmployee(item));
  }
  clearCurrentEntity(): void {
    this.store.dispatch(employeeActionTypes.clearCurrentEmployee());
  }
  saveNewEntity(item: IEmployee): void {
    this.store.dispatch(employeeActionTypes.saveEmployeeRequest(item));
  }
  updateExistingEntity(item: IEmployee): void {
    this.store.dispatch(employeeActionTypes.updateEmployeeRequest(item));
  }
}

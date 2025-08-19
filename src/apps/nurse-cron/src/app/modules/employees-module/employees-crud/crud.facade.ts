import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade, ModalStates, isModalState } from 'imng-kendo-data-entry';

import { employeesFeature, employeeActionTypes } from '../+state';
import { IEmployee,  } from '../../../models/employees-api';

@Injectable()
export class EmployeeCrudFacade implements IDataEntryFacade<IEmployee> {
  private readonly store = inject(Store);

  loading$ = this.store.select(employeesFeature.selectLoading);
  currentEntity$ = this.store.select(employeesFeature.selectCurrentEmployee);
  currentModalState$ = this.store.select(employeesFeature.selectCurrentEmployeeModalState);
  isEditActive$ = isModalState(this, ModalStates.EDIT);
  isNewActive$ = isModalState(this, ModalStates.ADD);

  public setCurrentEntity(item: IEmployee, modalState: string): void {
    this.store.dispatch(
      employeeActionTypes.setCurrentEmployee({
        modalState,
        entity: item,
      }),
    );
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

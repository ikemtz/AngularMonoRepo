import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { EmployeesPartialState } from './employees.reducer';
import { employeesQuery } from './employees.selectors';
import { KendoODataFacadeBase, ODataGridState } from '@imko/kendo-grid-odata';
import { IEmployee, IEmployeeCertification } from '../../models/emp-odata';
import { employeesActions } from './employees.actions';

@Injectable()
export class EmployeesFacade extends KendoODataFacadeBase<IEmployee, EmployeesPartialState> {
  getCurrentCertificationHasValue$ = this.store.pipe(select(employeesQuery.getCurrentCertificationHasValue));
  getCurrentCertification$ = this.store.pipe(select(employeesQuery.getCurrentCertification));

  constructor(store: Store<EmployeesPartialState>) {
    super(store, employeesQuery);
  }

  loadEntities(state: ODataGridState = { skip: 0, take: 20 }) {
    this.store.dispatch(employeesActions.loadEntities(state));
  }

  addNewEntity() {
    this.store.dispatch(employeesActions.addEditEntity({}));
  }

  clearCurrentEntity(): void {
    this.store.dispatch(employeesActions.clearCurrentEntity());
  }

  saveEntity(entity: IEmployee): void {
    this.store.dispatch(employeesActions.saveEntityRequest(entity));
  }

  addNewCertification(entity: IEmployee, cert: IEmployeeCertification) {
    cert.employeeId = entity.id;
    this.store.dispatch(employeesActions.addEditCertification({ employee: entity, certification: cert }));
  }

  clearCurrentCertification() {
    this.store.dispatch(employeesActions.clearCurrentCertification());
  }
}

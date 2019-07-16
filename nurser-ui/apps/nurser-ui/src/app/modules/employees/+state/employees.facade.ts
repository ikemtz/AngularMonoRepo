import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { EmployeesPartialState } from './employees.reducer';
import { employeesQuery } from './employees.selectors';
import { LoadEntities, AddEditEntity, ClearCurrentEntity, SaveEntityRequest, AddEditCertification, ClearCurrentCertification } from './employees.actions';
import { KendoODataFacadeBase, ODataGridState } from '@imko/kendo-grid-odata';
import { IEmployee, IEmployeeCertification } from '../../models/emp-odata'; 

@Injectable()
export class EmployeesFacade extends KendoODataFacadeBase<IEmployee, EmployeesPartialState> {
  getCurrentCertificationHasValue$ = this.store.pipe(select(employeesQuery.getCurrentCertificationHasValue));
  getCurrentCertification$ = this.store.pipe(select(employeesQuery.getCurrentCertification));

  constructor(store: Store<EmployeesPartialState>) {
    super(store, employeesQuery);
  }

  loadEntities(state: ODataGridState = { skip: 0, take: 20 }) {
    this.store.dispatch(new LoadEntities(state));
  }

  addNewEntity() {
    this.store.dispatch(new AddEditEntity({}));
  }

  clearCurrentEntity(): void {
    this.store.dispatch(new ClearCurrentEntity());
  }

  saveEntity(entity: IEmployee): void {
    this.store.dispatch(new SaveEntityRequest(entity));
  }

  addNewCertification(entity: IEmployee, cert: IEmployeeCertification) {
    cert.employeeId = entity.id;
    this.store.dispatch(new AddEditCertification({ employee: entity, certification: cert }));
  }

  clearCurrentCertification() {
    this.store.dispatch(new ClearCurrentCertification());
  }
}

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { EmployeesPartialState } from '../+state/employee.reducer';
import { employeeQueries } from '../+state/employee.selectors';
import * as employeeActionTypes from '../+state/employee.actions';
import { IEmployee } from '../../../models/employees-odata';

@Injectable()
export class EmployeeListFacade implements IKendoODataGridFacade<IEmployee>, IDataDeleteFacade<IEmployee> {
  loading$ = this.store.pipe(select(employeeQueries.getLoading));
  gridODataState$ = this.store.pipe(select(employeeQueries.getGridODataState));
  gridData$ = this.store.pipe(select(employeeQueries.getEmployees));
  gridPagerSettings$ = this.store.pipe(select(employeeQueries.getPagerSettings));

  constructor(private readonly store: Store<EmployeesPartialState>) { }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(employeeActionTypes.loadEmployeesRequest(state));
  }

  public deleteExistingEntity(entity: IEmployee): void {
    this.store.dispatch(employeeActionTypes.deleteEmployeeRequest(entity));
  }
}

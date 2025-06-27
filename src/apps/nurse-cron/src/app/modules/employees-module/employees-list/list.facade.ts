import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { employeesFeature, employeeActionTypes } from '../+state';
import { IEmployee } from '../../../models/employees-api';

@Injectable()
export class EmployeeListFacade implements IKendoODataGridFacade<IEmployee>, IDataDeleteFacade<IEmployee> {
  private readonly store = inject(Store);

  loading$ = this.store.select(employeesFeature.selectLoading);
  gridData$ = this.store.select(employeesFeature.selectGridData);
  gridPagerSettings$ = this.store.select(employeesFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(employeesFeature.selectGridODataState);

  public loadEntities(state: ODataState): void {
    this.store.dispatch(employeeActionTypes.loadEmployeesRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(employeeActionTypes.reloadEmployeesRequest());
  }

  public deleteExistingEntity(entity: IEmployee): void {
    this.store.dispatch(employeeActionTypes.deleteEmployeeRequest(entity));
  }
}

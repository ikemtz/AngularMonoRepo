import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';
import { environment } from '@env/nurse-cron';

import * as fromEmployeesReducer from './employee.reducer';
import * as employeeActionTypes from './employee.actions';
import { IEmployee } from '../../../models/employees-odata';
import { EmployeeApiService } from '../employees-crud';

@Injectable()
export class EmployeeEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly employeeApiService: EmployeeApiService,
    private readonly dataPersistence: DataPersistence<fromEmployeesReducer.EmployeesPartialState>,
  ) { }

  loadEmployeesEffect$ = createEffect(() =>
    this.dataPersistence.fetch(employeeActionTypes.loadEmployeesRequest,
      {
        run: (action: ReturnType<typeof employeeActionTypes.loadEmployeesRequest>) =>
          this.odataservice
            .fetch<IEmployee>(environment.endPoints.employees.employeesOData, action.payload)
            .pipe(map(t => employeeActionTypes.loadEmployeesSuccess(t))),
        onError: this.exceptionHandler,
      })
  );

  saveEmployeeEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(employeeActionTypes.saveEmployeeRequest,
      {
        run: (action: ReturnType<typeof employeeActionTypes.saveEmployeeRequest>, state: fromEmployeesReducer.EmployeesPartialState) =>
          this.employeeApiService.post(action.payload).pipe(
            map(() =>
              employeeActionTypes.loadEmployeesRequest(state[fromEmployeesReducer.EMPLOYEES_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      })
  );

  updateEmployeeEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(employeeActionTypes.updateEmployeeRequest,
      {
        run: (action: ReturnType<typeof employeeActionTypes.updateEmployeeRequest>, state: fromEmployeesReducer.EmployeesPartialState) =>
          this.employeeApiService.put(action.payload).pipe(
            map(() =>
              employeeActionTypes.loadEmployeesRequest(state[fromEmployeesReducer.EMPLOYEES_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      })
  );

  deleteEmployeeEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(employeeActionTypes.deleteEmployeeRequest,
      {
        run: (action: ReturnType<typeof employeeActionTypes.deleteEmployeeRequest>, state: fromEmployeesReducer.EmployeesPartialState) =>
          this.employeeApiService.delete(action.payload).pipe(
            map(() =>
              employeeActionTypes.loadEmployeesRequest(state[fromEmployeesReducer.EMPLOYEES_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      })
  );

  // tslint:disable-next-line: typedef
  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return employeeActionTypes.employeesFailure({ error });
  }
}

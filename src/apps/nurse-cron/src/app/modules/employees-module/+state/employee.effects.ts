import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { environment } from '@env';

import * as fromEmployeesReducer from './employee.reducer';
import * as employeeActionTypes from './employee.actions';
import { IEmployee } from '../../../models/employees-odata';
import { EmployeeApiService } from '../employees-crud';

@Injectable()
export class EmployeeEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store$: Store<fromEmployeesReducer.EmployeesPartialState>, 
    private readonly employeeApiService : EmployeeApiService, 
  ) {}

  loadEmployeesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActionTypes.loadEmployeesRequest),
      fetch({
        run: (action: ReturnType<typeof employeeActionTypes.loadEmployeesRequest>, state: fromEmployeesReducer.EmployeesPartialState) =>
          this.odataservice
            .fetch<IEmployee>(environment.endPoints.employees.employeesOData, action.payload)
            .pipe(map(t => employeeActionTypes.loadEmployeesSuccess(t))),
        onError: this.exceptionHandler,
      }),
    ),
  );

  saveEmployeeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActionTypes.saveEmployeeRequest),
      fetch({
        run: (action: ReturnType<typeof employeeActionTypes.saveEmployeeRequest>) =>
          this.employeeApiService.post(action.payload).pipe(
            withLatestFrom(this.store$),
            map(([_, store]) =>
              employeeActionTypes.loadEmployeesRequest(store[fromEmployeesReducer.EMPLOYEES_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  updateEmployeeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActionTypes.updateEmployeeRequest),
      fetch({
        run: (action: ReturnType<typeof employeeActionTypes.updateEmployeeRequest>, state: fromEmployeesReducer.EmployeesPartialState) =>
          this.employeeApiService.put(action.payload).pipe(
            withLatestFrom(this.store$),
            map(([_, store]) =>
              employeeActionTypes.loadEmployeesRequest(store[fromEmployeesReducer.EMPLOYEES_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  deleteEmployeeEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeeActionTypes.deleteEmployeeRequest),
      fetch({
        run: (action: ReturnType<typeof employeeActionTypes.deleteEmployeeRequest>) =>
          this.employeeApiService.delete(action.payload).pipe(
            withLatestFrom(this.store$),
            map(([_, store]) =>
              employeeActionTypes.loadEmployeesRequest(store[fromEmployeesReducer.EMPLOYEES_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return employeeActionTypes.employeesFailure({ error });
  }
}

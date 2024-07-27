import { Injectable } from '@angular/core';
import { environment } from '@env*';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { switchMap, map } from 'rxjs';
import { IEmployee, EmployeeProperties } from '../../../models/employees-odata';
import { EmployeeApiService } from '../employees-crud';
import { employeesFeature } from './employee.reducer';
import * as employeeActionTypes from './employee.actions';

@Injectable()
export class EmployeeEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly employeeApiService: EmployeeApiService,
  ) {}

  loadEmployeesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.loadEmployeesRequest),
      switchMap(
        (action: ReturnType<typeof employeeActionTypes.loadEmployeesRequest>) =>
          this.odataService
            .fetch<IEmployee>(
              environment.endPoints.employees.employeesOData,
              action.payload,
              {
                dateNullableProps: [
                  EmployeeProperties.BIRTH_DATE,
                  EmployeeProperties.FIRE_DATE,
                ],
              },
            )
            .pipe(
              map((t) => employeeActionTypes.loadEmployeesSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  reloadEmployeesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.reloadEmployeesRequest),
      concatLatestFrom(() =>
        this.store.select(employeesFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<IEmployee>(
            environment.endPoints.employees.employeesOData,
            odataState,
            {
              bustCache: true,
              dateNullableProps: [
                EmployeeProperties.BIRTH_DATE,
                EmployeeProperties.FIRE_DATE,
              ],
            },
          )
          .pipe(
            map((t) => employeeActionTypes.reloadEmployeesSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  saveEmployeeEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.saveEmployeeRequest),
      switchMap(
        (action: ReturnType<typeof employeeActionTypes.saveEmployeeRequest>) =>
          this.employeeApiService.post(action.payload).pipe(
            map(() => employeeActionTypes.reloadEmployeesRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  updateEmployeeEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.updateEmployeeRequest),
      switchMap(
        (
          action: ReturnType<typeof employeeActionTypes.updateEmployeeRequest>,
        ) =>
          this.employeeApiService.put(action.payload).pipe(
            map(() => employeeActionTypes.reloadEmployeesRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteEmployeeEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.deleteEmployeeRequest),
      switchMap(
        (
          action: ReturnType<typeof employeeActionTypes.deleteEmployeeRequest>,
        ) =>
          this.employeeApiService.delete(action.payload).pipe(
            map(() => employeeActionTypes.reloadEmployeesRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });
}

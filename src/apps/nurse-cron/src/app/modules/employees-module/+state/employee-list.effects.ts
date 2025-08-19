import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { employeesFeature } from './employee.feature';
import * as employeeActionTypes from './employee.actions';
import { IEmployee, EmployeeProperties } from '../../../models/employees-api';
import { environment } from '@env';

@Injectable()
export class EmployeeListEffects {
    private readonly actions$ = inject(Actions);
    private readonly odataService = inject(ODataService);
    private readonly store = inject(Store);


  loadEmployeesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.loadEmployeesRequest),
      switchMap((action: ReturnType<typeof employeeActionTypes.loadEmployeesRequest>) => this.odataService
        .fetch<IEmployee>(environment.endPoints.employees.employeesOData, action.payload, {
          dateNullableProps: [EmployeeProperties.BIRTH_DATE, EmployeeProperties.FIRE_DATE, EmployeeProperties.UPDATED_ON_UTC],
        })
        .pipe(
          map(t => employeeActionTypes.loadEmployeesSuccess(t)),
          handleEffectError(action))));
  });

  reloadEmployeesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.reloadEmployeesRequest),
      concatLatestFrom(() => this.store.select(employeesFeature.selectGridODataState)),
      switchMap(([action, odataState]) => this.odataService
        .fetch<IEmployee>(environment.endPoints.employees.employeesOData, odataState, {
          bustCache: true,
          dateNullableProps: [EmployeeProperties.BIRTH_DATE, EmployeeProperties.FIRE_DATE, ],
        })
        .pipe(
          map(t => employeeActionTypes.reloadEmployeesSuccess(t)),
          handleEffectError(action))));
  });
}

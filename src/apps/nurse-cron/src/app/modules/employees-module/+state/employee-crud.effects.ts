import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import * as employeeActionTypes from './employee.actions';

import { EmployeeApiService } from '../employees-crud/api.service';

@Injectable()
export class EmployeeCrudEffects {
  private readonly actions$ = inject(Actions);
  private readonly odataService = inject(ODataService);
  private readonly employeeApiService = inject(EmployeeApiService);


  saveEmployeeEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.saveEmployeeRequest),
      switchMap((action: ReturnType<typeof employeeActionTypes.saveEmployeeRequest>) => this.employeeApiService.post(action.payload).pipe(
        map(() => employeeActionTypes.reloadEmployeesRequest()),
        handleEffectError(action))));
  });

  updateEmployeeEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.updateEmployeeRequest),
      switchMap((action: ReturnType<typeof employeeActionTypes.updateEmployeeRequest>) => this.employeeApiService.put(action.payload).pipe(
        map(() => employeeActionTypes.reloadEmployeesRequest()),
        handleEffectError(action))));
  });

  deleteEmployeeEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(employeeActionTypes.deleteEmployeeRequest),
      switchMap((action: ReturnType<typeof employeeActionTypes.deleteEmployeeRequest>) => this.employeeApiService.delete(action.payload).pipe(
        map(() => employeeActionTypes.reloadEmployeesRequest()),
        handleEffectError(action))));
  });
}

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPLOYEES_FEATURE_KEY } from './employees.reducer';
import { environment } from '../../../../environments/environment';
import { map, concatMap, catchError } from 'rxjs/operators';
import { EmployeeApiService } from '../services/employee.api.service';
import { employeesActions } from './employees.actions';
import { of, Observable } from 'rxjs';
import { ODataService } from '@nurser-ui/imng-kendo-odata';

@Injectable()
export class EmployeesEffects {
  readonly baseODataUrl = environment.emplMs.ODataEndpoint;

  loadEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.loadEntities),
      concatMap(action =>
        this.odataService.fetch(this.baseODataUrl, action.payload).pipe(
          map(m => employeesActions.entitiesLoaded({ payload: m })),
          this.handleError(),
        ),
      ),
    ),
  );

  saveEntities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(employeesActions.saveEntityRequest),
      concatMap(action =>
        this.apiService.put(action.payload).pipe(
          map(m => employeesActions.saveEntitySuccess({ payload: m })),
          this.handleError(),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private odataService: ODataService, private apiService: EmployeeApiService) {}

  handleError = () => <T>(source: Observable<T>) =>
    source.pipe(catchError(error => of(employeesActions.entityError({ payload: error.message }))));
}

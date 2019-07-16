import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects'; 
import { EmployeesPartialState, EMPLOYEES_FEATURE_KEY } from './employees.reducer';
import { LoadEntities, EntityError, EmployeesActionTypes, EntitiesLoaded, SaveEntityRequest } from './employees.actions';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { DataPersistence } from '@nrwl/angular';
import { ODataService } from '@imko/kendo-grid-odata';
import { EmployeeApiService } from '../services/employee.api.service';

@Injectable()
export class EmployeesEffects {
  readonly baseODataUrl = environment.emplMs.ODataEndpoint;
  @Effect() loadEntities$ = this.dataPersistence.fetch(EmployeesActionTypes.LoadEntities, {
    run: (action: LoadEntities, state: EmployeesPartialState) => {
      return this.odataService.fetch(this.baseODataUrl, action.payload).pipe(map(m => new EntitiesLoaded(m)));
    },

    onError: (action: LoadEntities, error) => {
      console.error('Error', error);
      return new EntityError(error);
    }
  });
  @Effect() saveEntities$ = this.dataPersistence.fetch(EmployeesActionTypes.SaveEntityRequest, {
    run: (action: SaveEntityRequest, state: EmployeesPartialState) => {
      return this.apiService.put(action.payload).pipe(
        map(m =>
          new LoadEntities(state[EMPLOYEES_FEATURE_KEY].gridODataState)));
    },

    onError: (action: SaveEntityRequest, error) => {
      console.error('Error', error);
      return new EntityError(error);
    }
  });

  constructor(
    private actions$: Actions,
    private odataService: ODataService,
    private dataPersistence: DataPersistence<EmployeesPartialState>,
    private apiService: EmployeeApiService
  ) { }
}

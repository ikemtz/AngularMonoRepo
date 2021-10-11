import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';

import * as fromUnitsReducer from './unit.reducer';
import * as unitActionTypes from './unit.actions';

import { UnitApiService } from '../units-crud';
import { IUnit } from '../../../models/units-odata';
import { environment } from '@env/nurse-cron';

@Injectable()
export class UnitEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly dataPersistence: DataPersistence<fromUnitsReducer.UnitsPartialState>,
    private readonly unitApiService: UnitApiService,
  ) {}

  loadUnitsEffect$ = createEffect(() =>
    this.dataPersistence.fetch(unitActionTypes.loadUnitsRequest, {
      run: (action: ReturnType<typeof unitActionTypes.loadUnitsRequest>) =>
        this.odataservice
          .fetch<IUnit>(environment.endPoints.units.unitsOData, action.payload)
          .pipe(map((t) => unitActionTypes.loadUnitsSuccess(t))),
      onError: this.exceptionHandler,
    }),
  );

  reloadUnitsEffect$ = createEffect(() =>
    this.dataPersistence.fetch(unitActionTypes.reloadUnitsRequest, {
      run: (
        action: ReturnType<typeof unitActionTypes.reloadUnitsRequest>,
        partialState: fromUnitsReducer.UnitsPartialState,
      ) =>
        this.odataservice
          .fetch<IUnit>(
            environment.endPoints.units.unitsOData,
            partialState[fromUnitsReducer.UNITS_FEATURE_KEY].gridODataState,
            { bustCache: true },
          )
          .pipe(map((t) => unitActionTypes.loadUnitsSuccess(t))),
      onError: this.exceptionHandler,
    }),
  );

  saveUnitEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(unitActionTypes.saveUnitRequest, {
      run: (action: ReturnType<typeof unitActionTypes.saveUnitRequest>, state: fromUnitsReducer.UnitsPartialState) =>
        this.unitApiService
          .post(action.payload)
          .pipe(map(() => unitActionTypes.loadUnitsRequest(state[fromUnitsReducer.UNITS_FEATURE_KEY].gridODataState))),
      onError: this.exceptionHandler,
    }),
  );

  updateUnitEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(unitActionTypes.updateUnitRequest, {
      run: (action: ReturnType<typeof unitActionTypes.updateUnitRequest>, state: fromUnitsReducer.UnitsPartialState) =>
        this.unitApiService
          .put(action.payload)
          .pipe(map(() => unitActionTypes.loadUnitsRequest(state[fromUnitsReducer.UNITS_FEATURE_KEY].gridODataState))),
      onError: this.exceptionHandler,
    }),
  );

  deleteUnitEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(unitActionTypes.deleteUnitRequest, {
      run: (action: ReturnType<typeof unitActionTypes.deleteUnitRequest>, state: fromUnitsReducer.UnitsPartialState) =>
        this.unitApiService
          .delete(action.payload)
          .pipe(map(() => unitActionTypes.loadUnitsRequest(state[fromUnitsReducer.UNITS_FEATURE_KEY].gridODataState))),
      onError: this.exceptionHandler,
    }),
  );

  // tslint:disable-next-line: typedef
  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return unitActionTypes.unitsFailure({ error });
  }
}

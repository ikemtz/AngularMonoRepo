import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { environment } from '@env';

import * as fromUnitsReducer from './unit.reducer';
import * as unitActionTypes from './unit.actions';

import { UnitApiService } from '../units-crud';
import { IUnit } from '../../../models/units-odata';

@Injectable()
export class UnitEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store$: Store<fromUnitsReducer.UnitsPartialState>,
    private readonly unitApiService: UnitApiService,
  ) { }

  loadUnitsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unitActionTypes.loadUnitsRequest),
      fetch({
        run: (action: ReturnType<typeof unitActionTypes.loadUnitsRequest>) =>
          this.odataservice
            .fetch<IUnit>(environment.endPoints.units.unitsOData, action.payload)
            .pipe(map(t => unitActionTypes.loadUnitsSuccess(t))),
        onError: this.exceptionHandler,
      }),
    ),
  );

  saveUnitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unitActionTypes.saveUnitRequest),
      fetch({
        run: (action: ReturnType<typeof unitActionTypes.saveUnitRequest>, state: fromUnitsReducer.UnitsPartialState) =>
          this.unitApiService.post(action.payload).pipe(
            map(() =>
              unitActionTypes.loadUnitsRequest(state[fromUnitsReducer.UNITS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  updateUnitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unitActionTypes.updateUnitRequest),
      fetch({
        run: (action: ReturnType<typeof unitActionTypes.updateUnitRequest>, state: fromUnitsReducer.UnitsPartialState) =>
          this.unitApiService.put(action.payload).pipe(
            map(() =>
              unitActionTypes.loadUnitsRequest(state[fromUnitsReducer.UNITS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  deleteUnitEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(unitActionTypes.deleteUnitRequest),
      fetch({
        run: (action: ReturnType<typeof unitActionTypes.deleteUnitRequest>, state: fromUnitsReducer.UnitsPartialState) =>
          this.unitApiService.delete(action.payload).pipe(
            map(() =>
              unitActionTypes.loadUnitsRequest(state[fromUnitsReducer.UNITS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  // tslint:disable-next-line: typedef
  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return unitActionTypes.unitsFailure({ error });
  }
}

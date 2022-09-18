import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { unitsFeature } from './unit.reducer';
import * as unitActionTypes from './unit.actions';
import { environment } from '../../../../environments/environment';

import { UnitApiService } from '../units-crud';
import { IUnit, UnitProperties, IBuilding } from '../../../models/units-odata';

@Injectable()
export class UnitEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly unitApiService: UnitApiService,
  ) {}

  loadUnitsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActionTypes.loadUnitsRequest),
      switchMap((action: ReturnType<typeof unitActionTypes.loadUnitsRequest>) =>
        this.odataService
          .fetch<IUnit>(
            environment.endPoints.units.unitsOData,
            action.payload,
            {
              dateNullableProps: [UnitProperties.DELETED_ON_UTC],
            },
          )
          .pipe(
            map((t) => unitActionTypes.loadUnitsSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  reloadUnitsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActionTypes.reloadUnitsRequest),
      concatLatestFrom(() =>
        this.store.select(unitsFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<IUnit>(environment.endPoints.units.unitsOData, odataState, {
            bustCache: true,
            dateNullableProps: [UnitProperties.DELETED_ON_UTC],
          })
          .pipe(
            map((t) => unitActionTypes.reloadUnitsSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  saveUnitEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActionTypes.saveUnitRequest),
      switchMap((action: ReturnType<typeof unitActionTypes.saveUnitRequest>) =>
        this.unitApiService.post(action.payload).pipe(
          map(() => unitActionTypes.reloadUnitsRequest()),
          handleEffectError(action),
        ),
      ),
    );
  });

  updateUnitEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActionTypes.updateUnitRequest),
      switchMap(
        (action: ReturnType<typeof unitActionTypes.updateUnitRequest>) =>
          this.unitApiService.put(action.payload).pipe(
            map(() => unitActionTypes.reloadUnitsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteUnitEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActionTypes.deleteUnitRequest),
      switchMap(
        (action: ReturnType<typeof unitActionTypes.deleteUnitRequest>) =>
          this.unitApiService.delete(action.payload).pipe(
            map(() => unitActionTypes.reloadUnitsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  loadBuildingsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(unitActionTypes.loadBuildingsRequest),
      switchMap(
        (action: ReturnType<typeof unitActionTypes.loadBuildingsRequest>) =>
          this.odataService
            .fetch<IBuilding>(
              environment.endPoints.buildings.buildingsOData,
              action.payload,
            )
            .pipe(
              map((t) => unitActionTypes.loadBuildingsSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });
}

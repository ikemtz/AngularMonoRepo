import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { buildingsFeature } from './building.reducer';
import * as buildingActionTypes from './building.actions';
import { environment } from '../../../../environments/environment';

import { BuildingApiService } from '../buildings-crud';
import { BuildingProperties, IBuilding } from '../../../models/units-odata';

@Injectable()
export class BuildingEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly buildingApiService: BuildingApiService,
  ) {}

  loadBuildingsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(buildingActionTypes.loadBuildingsRequest),
      switchMap(
        (action: ReturnType<typeof buildingActionTypes.loadBuildingsRequest>) =>
          this.odataService
            .fetch<IBuilding>(
              environment.endPoints.buildings.buildingsOData,
              action.payload,
              {
                dateNullableProps: [BuildingProperties.DELETED_ON_UTC],
              },
            )
            .pipe(
              map((t) => buildingActionTypes.loadBuildingsSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  reloadBuildingsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(buildingActionTypes.reloadBuildingsRequest),
      concatLatestFrom(() =>
        this.store.select(buildingsFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<IBuilding>(
            environment.endPoints.buildings.buildingsOData,
            odataState,
            {
              bustCache: true,
              dateNullableProps: [BuildingProperties.DELETED_ON_UTC],
            },
          )
          .pipe(
            map((t) => buildingActionTypes.reloadBuildingsSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  saveBuildingEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(buildingActionTypes.saveBuildingRequest),
      switchMap(
        (action: ReturnType<typeof buildingActionTypes.saveBuildingRequest>) =>
          this.buildingApiService.post(action.payload).pipe(
            map(() => buildingActionTypes.reloadBuildingsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  updateBuildingEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(buildingActionTypes.updateBuildingRequest),
      switchMap(
        (
          action: ReturnType<typeof buildingActionTypes.updateBuildingRequest>,
        ) =>
          this.buildingApiService.put(action.payload).pipe(
            map(() => buildingActionTypes.reloadBuildingsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteBuildingEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(buildingActionTypes.deleteBuildingRequest),
      switchMap(
        (
          action: ReturnType<typeof buildingActionTypes.deleteBuildingRequest>,
        ) =>
          this.buildingApiService.delete(action.payload).pipe(
            map(() => buildingActionTypes.reloadBuildingsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });
}

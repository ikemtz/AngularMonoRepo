import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { environment } from '@env';

import * as fromBuildingsReducer from './building.reducer';
import * as buildingActionTypes from './building.actions';

import { BuildingApiService } from '../buildings-crud';
import { IBuilding } from '../../../models/units-odata';

@Injectable()
export class BuildingEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store$: Store<fromBuildingsReducer.BuildingsPartialState>,
    private readonly buildingApiService: BuildingApiService,
  ) { }

  loadBuildingsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(buildingActionTypes.loadBuildingsRequest),
      fetch({
        run: (action: ReturnType<typeof buildingActionTypes.loadBuildingsRequest>) =>
          this.odataservice
            .fetch<IBuilding>(environment.endPoints.buildings.buildingsOData, action.payload)
            .pipe(map(t => buildingActionTypes.loadBuildingsSuccess(t))),
        onError: this.exceptionHandler,
      }),
    ),
  );

  saveBuildingEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(buildingActionTypes.saveBuildingRequest),
      fetch({
        run: (action: ReturnType<typeof buildingActionTypes.saveBuildingRequest>,
          state: fromBuildingsReducer.BuildingsPartialState) =>
          this.buildingApiService.post(action.payload).pipe(
            map(() =>
              buildingActionTypes.loadBuildingsRequest(state[fromBuildingsReducer.BUILDINGS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  updateBuildingEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(buildingActionTypes.updateBuildingRequest),
      fetch({
        run: (action: ReturnType<typeof buildingActionTypes.updateBuildingRequest>,
          state: fromBuildingsReducer.BuildingsPartialState) =>
          this.buildingApiService.put(action.payload).pipe(
            map(() =>
              buildingActionTypes.loadBuildingsRequest(state[fromBuildingsReducer.BUILDINGS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  deleteBuildingEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(buildingActionTypes.deleteBuildingRequest),
      fetch({
        run: (action: ReturnType<typeof buildingActionTypes.deleteBuildingRequest>,
          state: fromBuildingsReducer.BuildingsPartialState) =>
          this.buildingApiService.delete(action.payload).pipe(
            map(() =>
              buildingActionTypes.loadBuildingsRequest(state[fromBuildingsReducer.BUILDINGS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  // tslint:disable-next-line: typedef
  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return buildingActionTypes.buildingsFailure({ error });
  }
}

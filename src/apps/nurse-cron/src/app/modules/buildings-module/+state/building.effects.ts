import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';
import { environment } from '@env/nurse-cron';

import * as fromBuildingsReducer from './building.reducer';
import * as buildingActionTypes from './building.actions';

import { BuildingApiService } from '../buildings-crud';
import { IBuilding } from '../../../models/units-odata';

@Injectable()
export class BuildingEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly dataPersistence: DataPersistence<fromBuildingsReducer.BuildingsPartialState>,
    private readonly buildingApiService: BuildingApiService,
  ) {}

  loadBuildingsEffect$ = createEffect(() =>
    this.dataPersistence.fetch(buildingActionTypes.loadBuildingsRequest, {
      run: (action: ReturnType<typeof buildingActionTypes.loadBuildingsRequest>) =>
        this.odataservice
          .fetch<IBuilding>(environment.endPoints.buildings.buildingsOData, action.payload)
          .pipe(map((t) => buildingActionTypes.loadBuildingsSuccess(t))),
      onError: this.exceptionHandler,
    }),
  );

  reloadBuildingsEffect$ = createEffect(() =>
    this.dataPersistence.fetch(buildingActionTypes.reloadBuildingsRequest, {
      run: (
        action: ReturnType<typeof buildingActionTypes.reloadBuildingsRequest>,
        partialState: fromBuildingsReducer.BuildingsPartialState,
      ) =>
        this.odataservice
          .fetch<IBuilding>(
            environment.endPoints.buildings.buildingsOData,
            partialState[fromBuildingsReducer.BUILDINGS_FEATURE_KEY].gridODataState,
            { bustCache: true },
          )
          .pipe(map((t) => buildingActionTypes.reloadBuildingsSuccess(t))),
      onError: this.exceptionHandler,
    }),
  );

  saveBuildingEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(buildingActionTypes.saveBuildingRequest, {
      run: (action: ReturnType<typeof buildingActionTypes.saveBuildingRequest>) =>
        this.buildingApiService.post(action.payload).pipe(map(() => buildingActionTypes.reloadBuildingsRequest())),
      onError: this.exceptionHandler,
    }),
  );

  updateBuildingEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(buildingActionTypes.updateBuildingRequest, {
      run: (action: ReturnType<typeof buildingActionTypes.updateBuildingRequest>) =>
        this.buildingApiService.put(action.payload).pipe(map(() => buildingActionTypes.reloadBuildingsRequest())),
      onError: this.exceptionHandler,
    }),
  );

  deleteBuildingEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(buildingActionTypes.deleteBuildingRequest, {
      run: (action: ReturnType<typeof buildingActionTypes.deleteBuildingRequest>) =>
        this.buildingApiService.delete(action.payload).pipe(map(() => buildingActionTypes.reloadBuildingsRequest())),
      onError: this.exceptionHandler,
    }),
  );

  // tslint:disable-next-line: typedef
  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return buildingActionTypes.buildingsFailure({ error });
  }
}

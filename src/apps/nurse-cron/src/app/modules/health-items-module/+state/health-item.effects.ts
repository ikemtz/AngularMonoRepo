import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence, fetch } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';
import { environment } from '@env/nurse-cron';

import * as fromHealthItemsReducer from './health-item.reducer';
import * as healthItemActionTypes from './health-item.actions';

import { HealthItemApiService } from '../health-items-crud';
import { IHealthItem } from '../../../models/health-items-odata';

@Injectable()
export class HealthItemEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly dataPersistence: DataPersistence<fromHealthItemsReducer.HealthItemsPartialState>,
    private readonly healthItemApiService: HealthItemApiService,
  ) {}

  loadHealthItemsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(healthItemActionTypes.loadHealthItemsRequest),
      fetch({
        run: (action: ReturnType<typeof healthItemActionTypes.loadHealthItemsRequest>) =>
          this.odataservice
            .fetch<IHealthItem>(environment.endPoints.healthItems.healthItemsOData, action.payload)
            .pipe(map((t) => healthItemActionTypes.loadHealthItemsSuccess(t))),
        onError: this.exceptionHandler,
      }),
    ),
  );

  reloadHealthItemsEffect$ = createEffect(() =>
    this.dataPersistence.fetch(healthItemActionTypes.reloadHealthItemsRequest, {
      run: (
        action: ReturnType<typeof healthItemActionTypes.reloadHealthItemsRequest>,
        partialState: fromHealthItemsReducer.HealthItemsPartialState,
      ) =>
        this.odataservice
          .fetch<IHealthItem>(
            environment.endPoints.healthItems.healthItemsOData,
            partialState[fromHealthItemsReducer.HEALTH_ITEMS_FEATURE_KEY].gridODataState,
            { bustCache: true },
          )
          .pipe(map((t) => healthItemActionTypes.loadHealthItemsSuccess(t))),
      onError: this.exceptionHandler,
    }),
  );

  saveHealthItemEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(healthItemActionTypes.saveHealthItemRequest, {
      run: (
        action: ReturnType<typeof healthItemActionTypes.saveHealthItemRequest>,
        state: fromHealthItemsReducer.HealthItemsPartialState,
      ) =>
        this.healthItemApiService
          .post(action.payload)
          .pipe(
            map(() =>
              healthItemActionTypes.loadHealthItemsRequest(
                state[fromHealthItemsReducer.HEALTH_ITEMS_FEATURE_KEY].gridODataState,
              ),
            ),
          ),
      onError: this.exceptionHandler,
    }),
  );

  updateHealthItemEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(healthItemActionTypes.updateHealthItemRequest, {
      run: (
        action: ReturnType<typeof healthItemActionTypes.updateHealthItemRequest>,
        state: fromHealthItemsReducer.HealthItemsPartialState,
      ) =>
        this.healthItemApiService
          .put(action.payload)
          .pipe(
            map(() =>
              healthItemActionTypes.loadHealthItemsRequest(
                state[fromHealthItemsReducer.HEALTH_ITEMS_FEATURE_KEY].gridODataState,
              ),
            ),
          ),
      onError: this.exceptionHandler,
    }),
  );

  deleteHealthItemEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(healthItemActionTypes.deleteHealthItemRequest, {
      run: (
        action: ReturnType<typeof healthItemActionTypes.deleteHealthItemRequest>,
        state: fromHealthItemsReducer.HealthItemsPartialState,
      ) =>
        this.healthItemApiService
          .delete(action.payload)
          .pipe(
            map(() =>
              healthItemActionTypes.loadHealthItemsRequest(
                state[fromHealthItemsReducer.HEALTH_ITEMS_FEATURE_KEY].gridODataState,
              ),
            ),
          ),
      onError: this.exceptionHandler,
    }),
  );

  // tslint:disable-next-line: typedef
  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return healthItemActionTypes.healthItemsFailure({ error });
  }
}

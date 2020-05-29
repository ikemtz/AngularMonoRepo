import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { environment } from '@env';

import * as fromHealthItemsReducer from './health-item.reducer';
import * as healthItemActionTypes from './health-item.actions';

import { HealthItemApiService } from '../health-items-crud';
import { IHealthItem } from '../../../models/health-items-odata';

@Injectable()
export class HealthItemEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store$: Store<fromHealthItemsReducer.HealthItemsPartialState>,
    private readonly healthItemApiService: HealthItemApiService,
  ) { }

  loadHealthItemsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(healthItemActionTypes.loadHealthItemsRequest),
      fetch({
        run: (action: ReturnType<typeof healthItemActionTypes.loadHealthItemsRequest>, state: fromHealthItemsReducer.HealthItemsPartialState) =>
          this.odataservice
            .fetch<IHealthItem>(environment.endPoints.healthItems.healthItemsOData, action.payload)
            .pipe(map(t => healthItemActionTypes.loadHealthItemsSuccess(t))),
        onError: this.exceptionHandler,
      }),
    ),
  );

  saveHealthItemEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(healthItemActionTypes.saveHealthItemRequest),
      fetch({
        run: (action: ReturnType<typeof healthItemActionTypes.saveHealthItemRequest>) =>
          this.healthItemApiService.post(action.payload).pipe(
            withLatestFrom(this.store$),
            map(([_, store]) =>
              healthItemActionTypes.loadHealthItemsRequest(store[fromHealthItemsReducer.HEALTH_ITEMS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  updateHealthItemEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(healthItemActionTypes.updateHealthItemRequest),
      fetch({
        run: (action: ReturnType<typeof healthItemActionTypes.updateHealthItemRequest>, state: fromHealthItemsReducer.HealthItemsPartialState) =>
          this.healthItemApiService.put(action.payload).pipe(
            withLatestFrom(this.store$),
            map(([_, store]) =>
              healthItemActionTypes.loadHealthItemsRequest(store[fromHealthItemsReducer.HEALTH_ITEMS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  deleteHealthItemEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(healthItemActionTypes.deleteHealthItemRequest),
      fetch({
        run: (action: ReturnType<typeof healthItemActionTypes.deleteHealthItemRequest>) =>
          this.healthItemApiService.delete(action.payload).pipe(
            withLatestFrom(this.store$),
            map(([_, store]) =>
              healthItemActionTypes.loadHealthItemsRequest(store[fromHealthItemsReducer.HEALTH_ITEMS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return healthItemActionTypes.healthItemsFailure({ error });
  }
}

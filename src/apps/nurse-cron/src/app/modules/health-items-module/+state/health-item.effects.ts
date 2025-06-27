import { Injectable, inject } from '@angular/core';
import { environment } from '@env';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { switchMap, map } from 'rxjs';
import { IHealthItem } from '../../../models/health-items-odata';
import { HealthItemApiService } from '../health-items-crud';
import { healthItemsFeature } from './health-item.reducer';
import * as healthItemActionTypes from './health-item.actions';

@Injectable()
export class HealthItemEffects {
  private readonly actions$ = inject(Actions);
  private readonly odataService = inject(ODataService);
  private readonly store = inject(Store);
  private readonly healthItemApiService = inject(HealthItemApiService);


  loadHealthItemsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.loadHealthItemsRequest),
      switchMap(
        (
          action: ReturnType<
            typeof healthItemActionTypes.loadHealthItemsRequest
          >,
        ) =>
          this.odataService
            .fetch<IHealthItem>(
              environment.endPoints.healthItems.healthItemsOData,
              action.payload,
            )
            .pipe(
              map((t) => healthItemActionTypes.loadHealthItemsSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  reloadHealthItemsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.reloadHealthItemsRequest),
      concatLatestFrom(() =>
        this.store.select(healthItemsFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<IHealthItem>(
            environment.endPoints.healthItems.healthItemsOData,
            odataState,
            {
              bustCache: true,
            },
          )
          .pipe(
            map((t) => healthItemActionTypes.reloadHealthItemsSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  saveHealthItemEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.saveHealthItemRequest),
      switchMap(
        (
          action: ReturnType<
            typeof healthItemActionTypes.saveHealthItemRequest
          >,
        ) =>
          this.healthItemApiService.post(action.payload).pipe(
            map(() => healthItemActionTypes.reloadHealthItemsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  updateHealthItemEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.updateHealthItemRequest),
      switchMap(
        (
          action: ReturnType<
            typeof healthItemActionTypes.updateHealthItemRequest
          >,
        ) =>
          this.healthItemApiService.put(action.payload).pipe(
            map(() => healthItemActionTypes.reloadHealthItemsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteHealthItemEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.deleteHealthItemRequest),
      switchMap(
        (
          action: ReturnType<
            typeof healthItemActionTypes.deleteHealthItemRequest
          >,
        ) =>
          this.healthItemApiService.delete(action.payload).pipe(
            map(() => healthItemActionTypes.reloadHealthItemsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });
}

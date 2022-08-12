import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { healthItemsFeature } from './health-item.reducer';
import * as healthItemActionTypes from './health-item.actions';
import { environment } from '../../../../environments/environment';

import { HealthItemApiService } from '../health-items-crud';
import { IHealthItem } from '../../../models/health-items-odata';

@Injectable()
export class HealthItemEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store: Store,
    private readonly healthItemApiService: HealthItemApiService,
  ) { }

  loadHealthItemsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.loadHealthItemsRequest),
      switchMap((action: ReturnType<typeof healthItemActionTypes.loadHealthItemsRequest>) => this.odataservice
        .fetch<IHealthItem>(environment.endPoints.healthItems.healthItemsOData, action.payload)
        .pipe(
          map(t => healthItemActionTypes.loadHealthItemsSuccess(t)),
          handleEffectError(action))));
  });

  reloadHealthItemsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.reloadHealthItemsRequest),
      concatLatestFrom(() => this.store.select(healthItemsFeature.selectGridODataState)),
      switchMap(([action, odataState]) => this.odataservice
        .fetch<IHealthItem>(environment.endPoints.healthItems.healthItemsOData, odataState, {
          bustCache: true,
        })
        .pipe(
          map(t => healthItemActionTypes.reloadHealthItemsSuccess(t)),
          handleEffectError(action))));
  });

  saveHealthItemEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.saveHealthItemRequest),
      switchMap((action: ReturnType<typeof healthItemActionTypes.saveHealthItemRequest>) => this.healthItemApiService.post(action.payload).pipe(
        map(() => healthItemActionTypes.reloadHealthItemsRequest()),
        handleEffectError(action))));
  });

  updateHealthItemEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.updateHealthItemRequest),
      switchMap((action: ReturnType<typeof healthItemActionTypes.updateHealthItemRequest>) => this.healthItemApiService.put(action.payload).pipe(
        map(() => healthItemActionTypes.reloadHealthItemsRequest()),
        handleEffectError(action))));
  });

  deleteHealthItemEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(healthItemActionTypes.deleteHealthItemRequest),
      switchMap((action: ReturnType<typeof healthItemActionTypes.deleteHealthItemRequest>) => this.healthItemApiService.delete(action.payload).pipe(
        map(() => healthItemActionTypes.reloadHealthItemsRequest()),
        handleEffectError(action))));
  });
}

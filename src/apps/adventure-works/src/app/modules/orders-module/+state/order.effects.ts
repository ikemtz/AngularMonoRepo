import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { ordersFeature } from './order.reducer';
import * as orderActionTypes from './order.actions';
import { environment } from '../../../../environments/environment';

import { OrderApiService } from '../orders-crud';
import { IOrder } from '../../../models/odata';

@Injectable()
export class OrderEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private store: Store,
    private readonly orderApiService: OrderApiService,
  ) { }

  loadOrdersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.loadOrdersRequest),
      switchMap((action: ReturnType<typeof orderActionTypes.loadOrdersRequest>) => this.odataservice
        .fetch<IOrder>(environment.odataEnpoints.orders, action.payload)
        .pipe(
          map(t => orderActionTypes.loadOrdersSuccess(t)),
          handleEffectError(action))));
  });

  reloadOrdersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.reloadOrdersRequest),
      concatLatestFrom(() => this.store.select(ordersFeature.selectGridODataState)),
      switchMap(([action, odataState]) => this.odataservice
        .fetch<IOrder>(environment.odataEnpoints.orders, odataState)
        .pipe(
          map(t => orderActionTypes.reloadOrdersSuccess(t)),
          handleEffectError(action))));
  });

  saveOrderEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.saveOrderRequest),
      switchMap((action: ReturnType<typeof orderActionTypes.saveOrderRequest>) => this.orderApiService.post(action.payload).pipe(
        map(() => orderActionTypes.reloadOrdersRequest()),
        handleEffectError(action))));
  });

  updateOrderEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.updateOrderRequest),
      switchMap((action: ReturnType<typeof orderActionTypes.updateOrderRequest>) => this.orderApiService.put(action.payload).pipe(
        map(() => orderActionTypes.reloadOrdersRequest()),
        handleEffectError(action))));
  });

  deleteOrderEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.deleteOrderRequest),
      switchMap((action: ReturnType<typeof orderActionTypes.deleteOrderRequest>) => this.orderApiService.delete(action.payload).pipe(
        map(() => orderActionTypes.reloadOrdersRequest()),
        handleEffectError(action))));
  });
}

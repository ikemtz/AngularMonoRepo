import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, mergeMap } from 'rxjs/operators';

import { ordersFeature, State } from './order.reducer';
import * as orderActionTypes from './order.actions';
import { environment } from '../../../../environments/environment';

import { OrderApiService } from '../orders-crud';
import { IOrder } from '../../../models/odata';


@Injectable()
export class OrderEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private store: Store<State>,
    private readonly orderApiService: OrderApiService,
  ) { }


  loadOrdersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActionTypes.loadOrdersRequest),
      mergeMap((action: ReturnType<typeof orderActionTypes.loadOrdersRequest>) => this.odataservice
        .fetch<IOrder>(environment.odataEnpoints.orders, action.payload)
        .pipe(
          map(t => orderActionTypes.loadOrdersSuccess(t)),
          handleEffectError(action)))));

  reloadOrdersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActionTypes.reloadOrdersRequest),
      concatLatestFrom(() => this.store.select(ordersFeature.selectGridODataState)),
      mergeMap(([action, odataState]) => this.odataservice
        .fetch<IOrder>(environment.odataEnpoints.orders, odataState)
        .pipe(
          map(t => orderActionTypes.reloadOrdersSuccess(t)),
          handleEffectError(action)))));

  saveOrderEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActionTypes.saveOrderRequest),
      mergeMap((action: ReturnType<typeof orderActionTypes.saveOrderRequest>) => this.orderApiService.post(action.payload).pipe(
        map(() => orderActionTypes.reloadOrdersRequest()),
        handleEffectError(action)))));

  updateOrderEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActionTypes.updateOrderRequest),
      mergeMap((action: ReturnType<typeof orderActionTypes.updateOrderRequest>) => this.orderApiService.put(action.payload).pipe(
        map(() => orderActionTypes.reloadOrdersRequest()),
        handleEffectError(action)))));

  deleteOrderEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActionTypes.deleteOrderRequest),
      mergeMap((action: ReturnType<typeof orderActionTypes.deleteOrderRequest>) => this.orderApiService.delete(action.payload).pipe(
        map(() => orderActionTypes.reloadOrdersRequest()),
        handleEffectError(action)))));

}

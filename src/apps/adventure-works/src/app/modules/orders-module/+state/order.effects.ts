import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { map, switchMap } from 'rxjs/operators';

import { ordersFeature } from './order.reducer';
import * as orderActionTypes from './order.actions';
import { environment } from '../../../../environments/environment';

import { OrderApiService } from '../orders-crud';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import {
  OrderProperties,
  ICustomer,
  IOrderAddress,
} from '../../../models/odata';
import { IExtOrder } from '../models/ext-order';

@Injectable()
export class OrderEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly orderApiService: OrderApiService,
  ) {}

  loadOrdersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.loadOrdersRequest),
      switchMap(
        (action: ReturnType<typeof orderActionTypes.loadOrdersRequest>) =>
          this.odataService
            .fetch<IExtOrder>(
              environment.odataEnpoints.orders,
              action.payload,
              {
                dateNullableProps: [OrderProperties.SHIP_DATE],
              },
            )
            .pipe(
              map((t) => orderActionTypes.loadOrdersSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  reloadOrdersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.reloadOrdersRequest),
      concatLatestFrom(() =>
        this.store.select(ordersFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<IExtOrder>(environment.odataEnpoints.orders, odataState, {
            bustCache: true,
            dateNullableProps: [OrderProperties.SHIP_DATE],
          })
          .pipe(
            map((t) => orderActionTypes.reloadOrdersSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  saveOrderEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.saveOrderRequest),
      switchMap(
        (action: ReturnType<typeof orderActionTypes.saveOrderRequest>) =>
          this.orderApiService.post(action.payload).pipe(
            map(() => orderActionTypes.reloadOrdersRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  updateOrderEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.updateOrderRequest),
      switchMap(
        (action: ReturnType<typeof orderActionTypes.updateOrderRequest>) =>
          this.orderApiService.put(action.payload).pipe(
            map(() => orderActionTypes.reloadOrdersRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteOrderEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.deleteOrderRequest),
      switchMap(
        (action: ReturnType<typeof orderActionTypes.deleteOrderRequest>) =>
          this.orderApiService.delete(action.payload).pipe(
            map(() => orderActionTypes.reloadOrdersRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  loadCustomersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.loadCustomersRequest),
      switchMap(
        (action: ReturnType<typeof orderActionTypes.loadCustomersRequest>) =>
          this.odataService
            .fetch<ICustomer>(
              environment.odataEnpoints.customers,
              action.payload,
            )
            .pipe(
              map((t) => orderActionTypes.loadCustomersSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  loadShipToAddressesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.loadShipToAddressesRequest),
      switchMap(
        (
          action: ReturnType<
            typeof orderActionTypes.loadShipToAddressesRequest
          >,
        ) =>
          this.odataService
            .fetch<IOrderAddress>(
              environment.odataEnpoints.customerAddresses,
              action.payload,
            )
            .pipe(
              map((t) => orderActionTypes.loadShipToAddressesSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  loadBillToAddressesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.loadBillToAddressesRequest),
      switchMap(
        (
          action: ReturnType<
            typeof orderActionTypes.loadBillToAddressesRequest
          >,
        ) =>
          this.odataService
            .fetch<IOrderAddress>(
              environment.odataEnpoints.customerAddresses,
              action.payload,
            )
            .pipe(
              map((t) => orderActionTypes.loadBillToAddressesSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });
}

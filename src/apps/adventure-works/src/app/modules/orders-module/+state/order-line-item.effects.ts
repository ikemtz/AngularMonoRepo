import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import * as orderLineItemActionTypes from './order-line-item.actions';
import { environment } from '../../../../environments/environment';
import { IOrderLineItem } from '../../../models/odata';
import { orderLineItemQueries } from './order-line-item.selectors';
import { OrderLineItemApiService } from '../order-line-items-list/api.service';


@Injectable()
export class OrderLineItemEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store: Store,
    private readonly apiService: OrderLineItemApiService,
  ) { }

  loadOrderLineItemsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderLineItemActionTypes.loadOrderLineItemsRequest),
      switchMap((action: ReturnType<typeof orderLineItemActionTypes.loadOrderLineItemsRequest>) => this.odataservice
        .fetch<IOrderLineItem>(environment.odataEnpoints.orderLineItems, action.payload.odataState)
        .pipe(
          map(odataResult => orderLineItemActionTypes.loadOrderLineItemsSuccess({ orderId: action.payload.orderId, odataResult })),
          handleEffectError(action))));
  });

  reloadOrderLineItemsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderLineItemActionTypes.reloadOrderLineItemsRequest),
      concatLatestFrom((action: ReturnType<typeof orderLineItemActionTypes.reloadOrderLineItemsRequest>) =>
        this.store.select(orderLineItemQueries.selectODataState$(action.payload))),
      switchMap(([action, odataState]) => this.odataservice
        .fetch<IOrderLineItem>(environment.odataEnpoints.orderLineItems, odataState, { bustCache: true })
        .pipe(
          map(odataResult => orderLineItemActionTypes.reloadOrderLineItemsSuccess({ orderId: action.payload, odataResult })),
          handleEffectError(action))));
  });

  deleteOrderLineItemEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderLineItemActionTypes.deleteOrderLineItemRequest),
      switchMap((action: ReturnType<typeof orderLineItemActionTypes.deleteOrderLineItemRequest>) =>
        this.apiService.delete(action.payload.orderLineItem).pipe(
          map(() => orderLineItemActionTypes.reloadOrderLineItemsRequest(action.payload.orderId)),
          handleEffectError(action))));
  });
}

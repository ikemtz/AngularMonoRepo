import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { ordersFeature } from './order.reducer';
import * as orderActionTypes from './order.actions';
import { environment } from '../../../../environments/environment';

import { IOrder, OrderProperties } from '../../../models/odata';
import { toODataQuery } from 'imng-prime-table-odata';
import { ODataClientService } from 'imng-odata-client';

@Injectable()
export class OrderEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataClientService,
    private readonly store: Store,
  ) {}

  loadOrdersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.loadOrdersRequest),
      switchMap(
        (action: ReturnType<typeof orderActionTypes.loadOrdersRequest>) =>
          this.odataservice
            .fetch<IOrder>(
              environment.odataEnpoints.orders,
              toODataQuery(action.payload),
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
      concatLatestFrom(() => this.store.select(ordersFeature.selectGridState)),
      switchMap(([action, odataState]) =>
        this.odataservice
          .fetch<IOrder>(
            environment.odataEnpoints.orders,
            toODataQuery(odataState),
            {
              bustCache: true,
              dateNullableProps: [OrderProperties.SHIP_DATE],
            },
          )
          .pipe(
            map((t) => orderActionTypes.reloadOrdersSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });
}

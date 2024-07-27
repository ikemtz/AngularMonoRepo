import { Injectable } from '@angular/core';
import { environment } from '@env*';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { handleEffectError } from 'imng-ngrx-utils';
import { ODataClientService } from 'imng-odata-client';
import { toODataQuery } from 'imng-prime-table-odata';
import { switchMap, map } from 'rxjs';
import { IOrder, OrderProperties } from '../../../models/odata';
import * as orderActionTypes from './order.actions';
import { ordersFeature } from './order.reducer';

@Injectable()
export class OrderEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataClientService,
    private readonly store: Store,
  ) {}

  loadOrdersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActionTypes.loadOrdersRequest),
      switchMap(
        (action: ReturnType<typeof orderActionTypes.loadOrdersRequest>) =>
          this.odataService
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
      concatLatestFrom(() => this.store.select(ordersFeature.selectTableState)),
      switchMap(([action, odataState]) =>
        this.odataService
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

import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';
import { ISaleOrder, SaleOrderProperties } from '../../../models';

import * as fromSaleOrdersReducer from './sale-order.reducer';
import * as saleOrderActionTypes from './sale-order.actions';

import { SaleOrderApiService } from '../sale-orders-crud';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/adventure-works/src/environments/environment';

@Injectable()
export class SaleOrderEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly dataPersistence: DataPersistence<fromSaleOrdersReducer.SaleOrdersPartialState>,
    private readonly saleOrderApiService: SaleOrderApiService,
  ) {}

  loadSaleOrdersEffect$ = createEffect(() =>
    this.dataPersistence.fetch(saleOrderActionTypes.loadSaleOrdersRequest, {
      run: (action: ReturnType<typeof saleOrderActionTypes.loadSaleOrdersRequest>) =>
        this.odataservice
          .fetch<ISaleOrder>(environment.endPoints.sale_orders, action.payload, [], [SaleOrderProperties.DATE])
          .pipe(map((t) => saleOrderActionTypes.loadSaleOrdersSuccess(t))),
      onError: this.exceptionHandler,
    }),
  );

  saveSaleOrderEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(saleOrderActionTypes.saveSaleOrderRequest, {
      run: (
        action: ReturnType<typeof saleOrderActionTypes.saveSaleOrderRequest>,
        partialState: fromSaleOrdersReducer.SaleOrdersPartialState,
      ) =>
        this.saleOrderApiService
          .post(action.payload)
          .pipe(
            map(() =>
              saleOrderActionTypes.loadSaleOrdersRequest(
                partialState[fromSaleOrdersReducer.SALE_ORDERS_FEATURE_KEY].gridODataState,
              ),
            ),
          ),
      onError: this.exceptionHandler,
    }),
  );

  updateSaleOrderEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(saleOrderActionTypes.updateSaleOrderRequest, {
      run: (
        action: ReturnType<typeof saleOrderActionTypes.updateSaleOrderRequest>,
        partialState: fromSaleOrdersReducer.SaleOrdersPartialState,
      ) =>
        this.saleOrderApiService
          .put(action.payload)
          .pipe(
            map(() =>
              saleOrderActionTypes.loadSaleOrdersRequest(
                partialState[fromSaleOrdersReducer.SALE_ORDERS_FEATURE_KEY].gridODataState,
              ),
            ),
          ),
      onError: this.exceptionHandler,
    }),
  );

  deleteSaleOrderEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(saleOrderActionTypes.deleteSaleOrderRequest, {
      run: (
        action: ReturnType<typeof saleOrderActionTypes.deleteSaleOrderRequest>,
        partialState: fromSaleOrdersReducer.SaleOrdersPartialState,
      ) =>
        this.saleOrderApiService
          .delete(action.payload)
          .pipe(
            map(() =>
              saleOrderActionTypes.loadSaleOrdersRequest(
                partialState[fromSaleOrdersReducer.SALE_ORDERS_FEATURE_KEY].gridODataState,
              ),
            ),
          ),
      onError: this.exceptionHandler,
    }),
  );

  private exceptionHandler(_action: unknown, error: unknown) {
    console.error('Error', error); // NOSONAR
    return saleOrderActionTypes.saleOrdersFailure({ error });
  }
}

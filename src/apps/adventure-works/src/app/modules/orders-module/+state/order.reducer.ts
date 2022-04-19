import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { IOrder } from '../../../models/odata';
import { IExtOrder } from '../models/ext-order';

import * as orderActionTypes from './order.actions';
import * as orderLineItemActionTypes from './order-line-item.actions';
import { findAndModify } from 'imng-ngrx-utils';
export const ORDERS_FEATURE_KEY = 'orders';

export interface State extends KendoODataGridState<IExtOrder> {
  currentOrder: IOrder | undefined;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentOrder: undefined,
  loading: true,
};

export const ordersFeature = createFeature({
  name: ORDERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(orderActionTypes.loadOrdersRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(orderActionTypes.loadOrdersSuccess,
      orderActionTypes.reloadOrdersSuccess,
      (state, { payload }): State => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null,
      })),
    on(orderActionTypes.setCurrentOrder,
      (state, { payload }): State =>
        ({ ...state, currentOrder: payload })),
    on(orderActionTypes.clearCurrentOrder,
      (state): State => ({ ...state, currentOrder: undefined })),
    on(orderActionTypes.saveOrderRequest,
      orderActionTypes.updateOrderRequest,
      orderActionTypes.deleteOrderRequest,
      (state): State => ({
        ...state,
        loading: true,
      }),
    ),
    on(orderLineItemActionTypes.loadOrderLineItemsRequest,
      (state, { payload }): State =>
      ({
        ...state,
        loading: true,
        gridData: {
          data: findAndModify(state.gridData.data, payload.orderId, rec => rec.orderLineItemODataState = payload.odataState),
          total: state.gridData.total
        },
      })),
    on(orderLineItemActionTypes.reloadOrderLineItemsRequest,
      (state): State =>
      ({
        ...state,
        loading: true
      })),
    on(orderLineItemActionTypes.loadOrderLineItemsSuccess,
      orderLineItemActionTypes.reloadOrderLineItemsSuccess,
      (state, { payload }): State =>
      ({
        ...state,
        loading: false,
        gridData: {
          data: findAndModify(state.gridData.data, payload.orderId, rec => {
            rec.orderLineItemOData = payload.odataResult;
            rec.orderLineItemPagerSettings = getODataPagerSettings({
              gridData: payload.odataResult,
              gridODataState: rec.orderLineItemODataState,
            });
          }),
          total: state.gridData.total
        },
      }))
  )
});

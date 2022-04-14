import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { IOrder } from '../../../models/odata';

import * as orderActionTypes from './order.actions';
export const ORDERS_FEATURE_KEY = 'orders';

export interface State extends KendoODataGridState<IOrder> {
  currentOrder: IOrder | undefined;
}

export interface OrdersPartialState {
  readonly [ORDERS_FEATURE_KEY]: State;
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

    on(orderActionTypes.loadOrdersRequest, (state, { payload }) => ({
      ...state,
      gridODataState: payload,
      loading: true,
      error: null,
    })),
    on(orderActionTypes.loadOrdersSuccess,
      orderActionTypes.reloadOrdersSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null,
      })),

    on(orderActionTypes.setCurrentOrder, (state, { payload }) => ({ ...state, currentOrder: payload })),
    on(orderActionTypes.clearCurrentOrder, state => ({ ...state, currentOrder: undefined })),
    on(
      orderActionTypes.saveOrderRequest,
      orderActionTypes.updateOrderRequest,
      orderActionTypes.deleteOrderRequest,
      state => ({
        ...state,
        loading: true,
      }),
    ),
  )
});

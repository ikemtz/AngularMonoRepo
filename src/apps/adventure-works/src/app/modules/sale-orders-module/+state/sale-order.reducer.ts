import { createReducer, on, Action } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';

import { ISaleOrder } from '../../../models';
import * as saleOrderActionTypes from './sale-order.actions';
export const SALE_ORDERS_FEATURE_KEY = 'saleOrders';

export interface State extends KendoODataGridState<ISaleOrder> {
  currentSaleOrder?: ISaleOrder;
}

export interface SaleOrdersPartialState {
  readonly [SALE_ORDERS_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  loading: true,
};

const saleOrdersReducer = createReducer(
  initialState,
  on(saleOrderActionTypes.saleOrdersFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  on(saleOrderActionTypes.loadSaleOrdersRequest, (state, { payload }) => ({
    ...state,
    gridODataState: payload,
    loading: true,
    error: null,
  })),
  on(saleOrderActionTypes.loadSaleOrdersSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    gridPagerSettings: getODataPagerSettings({
      gridData: payload,
      gridODataState: state.gridODataState,
    }),
    gridData: payload,
    error: null,
  })),

  on(saleOrderActionTypes.setCurrentSaleOrder, (state, { payload }) => ({ ...state, currentSaleOrder: payload })),
  on(saleOrderActionTypes.clearCurrentSaleOrder, state => ({ ...state, currentSaleOrder: undefined })),
  on(
    saleOrderActionTypes.saveSaleOrderRequest,
    saleOrderActionTypes.updateSaleOrderRequest,
    saleOrderActionTypes.deleteSaleOrderRequest,
    state => ({
      ...state,
      loading: true,
    }),
  ),

);

export function reducer(state: State | undefined, action: Action): State {
  return saleOrdersReducer(state, action);
}

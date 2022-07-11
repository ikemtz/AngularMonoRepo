import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';

import * as orderActionTypes from './order.actions';
export const ORDERS_FEATURE_KEY = 'orders';

export interface State extends KendoODataGridState<IOrder> {
  currentOrder: IOrder | undefined;
  customers: ICustomer[];
  shipToAddresses: IOrderAddress[];
  billToAddresses: IOrderAddress[];
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentOrder: undefined,
  customers: [],
  shipToAddresses: [],
  billToAddresses: [],
  loading: true,
};

export const ordersFeature = createFeature({
  name: ORDERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(orderActionTypes.loadOrdersRequest, 
      (state, { payload }) : State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null, })),
    on(orderActionTypes.loadOrdersSuccess,
      orderActionTypes.reloadOrdersSuccess, 
      (state, { payload }) : State => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null, })),
    on(orderActionTypes.setCurrentOrder, 
      (state, { payload }) : State => 
        ({ ...state, currentOrder: payload })),
    on(orderActionTypes.clearCurrentOrder, 
      (state) : State => ({ ...state, currentOrder: undefined })),
    on(orderActionTypes.saveOrderRequest,
      orderActionTypes.updateOrderRequest,
      orderActionTypes.deleteOrderRequest,
      (state) : State => ({
        ...state,
        loading: true,
      })),
    on(orderActionTypes.loadCustomersSuccess,
      (state, { payload }): State => ({
        ...state,
        customers: payload.data
      })),
    on(orderActionTypes.loadShipToAddressesSuccess,
      (state, { payload }): State => ({
        ...state,
        shipToAddresses: payload.data
      })),
    on(orderActionTypes.loadBillToAddressesSuccess,
      (state, { payload }): State => ({
        ...state,
        billToAddresses: payload.data
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});

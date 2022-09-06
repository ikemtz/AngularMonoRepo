import { createReducer, on, createFeature } from '@ngrx/store';
import { IOrder } from '../../../models/odata';

import * as orderActionTypes from './order.actions';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import {
  createPrimeODataGridInitialState,
  PrimeODataTableState,
} from 'imng-prime-table-odata';
export const ORDERS_FEATURE_KEY = 'orders';

export type State = PrimeODataTableState<IOrder>;

export const initialState: State = {
  ...createPrimeODataGridInitialState(),
};

export const ordersFeature = createFeature({
  name: ORDERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(
      orderActionTypes.loadOrdersRequest,
      (state, { payload }): State => ({
        ...state,
        tableState: payload,
        loading: true,
        error: null,
      }),
    ),
    on(
      orderActionTypes.loadOrdersSuccess,
      orderActionTypes.reloadOrdersSuccess,
      (state, { payload }): State => ({
        ...state,
        loading: false,
        tableData: payload.value,
        totalRecordCount: payload.count,
        error: null,
      }),
    ),
    on(imngEffectError, imngEffectErrorReducer),
  ),
});

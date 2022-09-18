import { createReducer, on, createFeature } from '@ngrx/store';
import { IOrder } from '../../../models/odata';

import * as orderActionTypes from './order.actions';
import { imngEffectError } from 'imng-ngrx-utils';
import {
  createPrimeODataTableInitialState,
  imngPrimeEffectErrorReducer,
  PrimeODataTableState,
} from 'imng-prime-table-odata';
export const ORDERS_FEATURE_KEY = 'orders';

export type State = PrimeODataTableState<IOrder>;

export const initialState: State = {
  ...createPrimeODataTableInitialState(),
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
        activeEffectCount: state.activeEffectCount + 1,
        error: null,
      }),
    ),
    on(
      orderActionTypes.reloadOrdersRequest,
      (state): State => ({
        ...state,
        activeEffectCount: state.activeEffectCount + 1,
        error: null,
      }),
    ),
    on(
      orderActionTypes.loadOrdersSuccess,
      orderActionTypes.reloadOrdersSuccess,
      (state, { payload }): State => ({
        ...state,
        activeEffectCount: state.activeEffectCount - 1,
        tableData: payload.value,
        totalRecordCount: payload.count,
        error: null,
      }),
    ),
    on(imngEffectError, imngPrimeEffectErrorReducer),
  ),
});

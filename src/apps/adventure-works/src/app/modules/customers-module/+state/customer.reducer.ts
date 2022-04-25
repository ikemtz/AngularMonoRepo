import { createReducer, on, createFeature } from '@ngrx/store';
import {
  createKendoODataGridInitialState,
  getODataPagerSettings,
  KendoODataGridState,
} from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import { ICustomer, ISalesAgent } from '../../../models/odata';

import * as customerActionTypes from './customer.actions';
export const CUSTOMERS_FEATURE_KEY = 'customers';

export interface State extends KendoODataGridState<ICustomer> {
  currentCustomer: ICustomer | undefined;
  salesAgents: ISalesAgent[];
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentCustomer: undefined,
  salesAgents: [],
  loading: true,
};

export const customersFeature = createFeature({
  name: CUSTOMERS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(
      customerActionTypes.loadCustomersRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      }),
    ),
    on(
      customerActionTypes.loadCustomersSuccess,
      customerActionTypes.reloadCustomersSuccess,
      (state, { payload }): State => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null,
      }),
    ),
    on(
      customerActionTypes.setCurrentCustomer,
      (state, { payload }): State => ({ ...state, currentCustomer: payload }),
    ),
    on(
      customerActionTypes.clearCurrentCustomer,
      (state): State => ({ ...state, currentCustomer: undefined }),
    ),
    on(
      customerActionTypes.saveCustomerRequest,
      customerActionTypes.updateCustomerRequest,
      customerActionTypes.deleteCustomerRequest,
      (state): State => ({
        ...state,
        loading: true,
      }),
    ),
    on(
      customerActionTypes.loadSalesAgentsSuccess,
      (state, { payload }): State => ({
        ...state,
        salesAgents: payload.data,
      }),
    ),
    on(imngEffectError, imngEffectErrorReducer),
  ),
});

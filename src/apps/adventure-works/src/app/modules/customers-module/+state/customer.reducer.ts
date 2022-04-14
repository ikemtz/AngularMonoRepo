import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { ICustomer } from '../../../models/odata';

import * as customerActionTypes from './customer.actions';
export const CUSTOMERS_FEATURE_KEY = 'customers';

export interface State extends KendoODataGridState<ICustomer> {
  currentCustomer: ICustomer | undefined;
}

export interface CustomersPartialState {
  readonly [CUSTOMERS_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentCustomer: undefined,
  loading: true,
};
export const customersFeature = createFeature(
  {
    name: CUSTOMERS_FEATURE_KEY,
    reducer: createReducer(
      initialState,
      on(customerActionTypes.customersFailure, (state, { payload }) => ({
        ...state,
        error: payload.error,
      })),
      on(customerActionTypes.loadCustomersRequest, (state, { payload }) => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
      on(customerActionTypes.loadCustomersSuccess,
        customerActionTypes.reloadCustomersSuccess, (state, { payload }) => ({
          ...state,
          loading: false,
          gridPagerSettings: getODataPagerSettings({
            gridData: payload,
            gridODataState: state.gridODataState,
          }),
          gridData: payload,
          error: null,
        })),

      on(customerActionTypes.setCurrentCustomer, (state, { payload }) => ({ ...state, currentCustomer: payload })),
      on(customerActionTypes.clearCurrentCustomer, state => ({ ...state, currentCustomer: undefined })),
      on(
        customerActionTypes.saveCustomerRequest,
        customerActionTypes.updateCustomerRequest,
        customerActionTypes.deleteCustomerRequest,
        state => ({
          ...state,
          loading: true,
        }),
      ),

    )
  }
); 

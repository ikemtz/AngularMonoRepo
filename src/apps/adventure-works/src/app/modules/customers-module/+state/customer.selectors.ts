import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CUSTOMERS_FEATURE_KEY, State, CustomersPartialState } from './customer.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getCustomersState = createFeatureSelector< State>(
  CUSTOMERS_FEATURE_KEY,
);

const getCustomers = createSelector(getCustomersState, state => state.gridData);
const getLoading = createSelector(getCustomersState, state => state.loading);
const getGridODataState = createSelector(getCustomersState, state => state.gridODataState);
const getPagerSettings = createSelector(getCustomersState, state => state.gridPagerSettings);
export const odataGridCustomerQueries = {
  getCustomers,
  getLoading,
  getGridODataState,
  getPagerSettings,
};

const getCurrentCustomer = createSelector(
  getCustomersState,
  state => state.currentCustomer,
);
const getIsEditCustomerActive = createSelector(
  getCurrentCustomer,
  entity => isTruthy(entity) && isTruthy(entity?.id),
);
const getIsNewCustomerActive = createSelector(
  getCurrentCustomer,
  entity => isTruthy(entity) && !isTruthy(entity?.id),
);
export const dataEntryCustomerQueries = {
  getCurrentCustomer,
  getIsEditCustomerActive,
  getIsNewCustomerActive,
};

export const customerQueries = { ...odataGridCustomerQueries, ...dataEntryCustomerQueries };


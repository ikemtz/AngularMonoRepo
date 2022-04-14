import { createSelector } from '@ngrx/store';
import { customersFeature } from './customer.reducer';
import { isTruthy } from 'imng-ngrx-utils';


const getCurrentCustomer = customersFeature.selectCurrentCustomer;
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

export const customerQueries = { ...dataEntryCustomerQueries };

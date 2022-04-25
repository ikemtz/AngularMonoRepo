import { createSelector } from '@ngrx/store';
import { customersFeature } from './customer.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditCustomerActive = createSelector(
  customersFeature.selectCurrentCustomer,
  (entity) => isTruthy(entity) && isTruthy((entity as { id: never }).id),
);
const selectIsNewCustomerActive = createSelector(
  customersFeature.selectCurrentCustomer,
  (entity) => isTruthy(entity) && !isTruthy((entity as { id: never }).id),
);
export const dataEntryCustomerQueries = {
  selectCurrentCustomer: customersFeature.selectCurrentCustomer,
  selectIsEditCustomerActive,
  selectIsNewCustomerActive,
};

export const customerQueries = { ...dataEntryCustomerQueries };

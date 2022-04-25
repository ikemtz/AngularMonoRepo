import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { ICustomer, ISalesAgent } from '../../../models/odata';

export const loadCustomersRequest = createPayloadAction<ODataState>(
  '[Customers] Load Customers Request',
);
export const loadCustomersSuccess = createPayloadAction<ODataResult<ICustomer>>(
  '[Customers] Load Customers Success',
);
export const reloadCustomersRequest = createAction(
  '[Customers] Reload Customers Request',
);
export const reloadCustomersSuccess = createPayloadAction<
  ODataResult<ICustomer>
>('[Customers] Reload Customers Success');

export const clearCurrentCustomer = createAction(
  '[Customers] Clear Current Customer',
);
export const setCurrentCustomer = createPayloadAction<ICustomer>(
  '[Customers] Set Current Customer',
);
export const saveCustomerRequest = createPayloadAction<ICustomer>(
  '[Customers] Save Customer Request',
);
export const updateCustomerRequest = createPayloadAction<ICustomer>(
  '[Customers] Update Customer Request',
);
export const deleteCustomerRequest = createPayloadAction<ICustomer>(
  '[Customers] Delete Customer Request',
);

export const loadSalesAgentsRequest = createPayloadAction<ODataState>(
  '[Customers] Load SalesAgents Request',
);
export const loadSalesAgentsSuccess = createPayloadAction<
  ODataResult<ISalesAgent>
>('[Customers] Load SalesAgents Success');

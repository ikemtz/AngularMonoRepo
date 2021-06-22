import { createAction } from '@ngrx/store';
import { ICustomer } from '../../../models';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';

export const customersFailure = createPayloadAction<{ error: unknown; }>('[Customers] Customers Failure');

export const loadCustomersRequest = createPayloadAction<ODataState>(
    '[Customers] Load Customers Request');
export const loadCustomersSuccess = createPayloadAction<ODataResult<ICustomer>>(
    '[Customers] Load Customers Success',
);

export const clearCurrentCustomer = createAction('[Customers] Clear Current Customer');
export const setCurrentCustomer = createPayloadAction<ICustomer>('[Customers] Set Current Customer');
export const saveCustomerRequest = createPayloadAction<ICustomer>('[Customers] Save Customer Request');
export const updateCustomerRequest = createPayloadAction<ICustomer>('[Customers] Update Customer Request');
export const deleteCustomerRequest = createPayloadAction<ICustomer>('[Customers] Delete Customer Request');

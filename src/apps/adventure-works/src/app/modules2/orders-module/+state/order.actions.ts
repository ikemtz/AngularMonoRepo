import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';

export const loadOrdersRequest = createPayloadAction<ODataState>(
    '[Orders] Load Orders Request');
export const loadOrdersSuccess = createPayloadAction<ODataResult<IOrder>>(
    '[Orders] Load Orders Success');
export const reloadOrdersRequest = createAction(
    '[Orders] Reload Orders Request');
export const reloadOrdersSuccess = createPayloadAction<ODataResult<IOrder>>(
    '[Orders] Reload Orders Success');

export const clearCurrentOrder = createAction('[Orders] Clear Current Order');
export const setCurrentOrder = createPayloadAction<IOrder>('[Orders] Set Current Order');
export const saveOrderRequest = createPayloadAction<IOrder>('[Orders] Save Order Request');
export const updateOrderRequest = createPayloadAction<IOrder>('[Orders] Update Order Request');
export const deleteOrderRequest = createPayloadAction<IOrder>('[Orders] Delete Order Request');

export const loadCustomersRequest = createPayloadAction<ODataState>(
    '[Orders] Load Customers Request');
export const loadCustomersSuccess = createPayloadAction<ODataResult<ICustomer>>(
    '[Orders] Load Customers Success');
export const loadShipToAddressesRequest = createPayloadAction<ODataState>(
    '[Orders] Load ShipToAddresses Request');
export const loadShipToAddressesSuccess = createPayloadAction<ODataResult<IOrderAddress>>(
    '[Orders] Load ShipToAddresses Success');
export const loadBillToAddressesRequest = createPayloadAction<ODataState>(
    '[Orders] Load BillToAddresses Request');
export const loadBillToAddressesSuccess = createPayloadAction<ODataResult<IOrderAddress>>(
    '[Orders] Load BillToAddresses Success');

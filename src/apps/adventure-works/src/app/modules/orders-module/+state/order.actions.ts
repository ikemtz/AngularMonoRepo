import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IOrder } from '../../../models/odata';
import { IExtOrder } from '../models/ext-order';

export const loadOrdersRequest = createPayloadAction<ODataState>(
    '[Orders] Load Orders Request');
export const loadOrdersSuccess = createPayloadAction<ODataResult<IExtOrder>>(
    '[Orders] Load Orders Success');
export const reloadOrdersRequest = createAction(
    '[Orders] Reload Orders Request');
export const reloadOrdersSuccess = createPayloadAction<ODataResult<IExtOrder>>(
    '[Orders] Reload Orders Success');

export const clearCurrentOrder = createAction('[Orders] Clear Current Order');
export const setCurrentOrder = createPayloadAction<IOrder>('[Orders] Set Current Order');
export const saveOrderRequest = createPayloadAction<IOrder>('[Orders] Save Order Request');
export const updateOrderRequest = createPayloadAction<IOrder>('[Orders] Update Order Request');
export const deleteOrderRequest = createPayloadAction<IOrder>('[Orders] Delete Order Request'); 

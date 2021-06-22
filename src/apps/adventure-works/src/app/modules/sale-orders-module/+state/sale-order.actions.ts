import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { ISaleOrder } from '../../../models';

export const saleOrdersFailure = createPayloadAction<{ error: unknown; }>('[SaleOrders] SaleOrders Failure');

export const loadSaleOrdersRequest = createPayloadAction<ODataState>(
    '[SaleOrders] Load SaleOrders Request');
export const loadSaleOrdersSuccess = createPayloadAction<ODataResult<ISaleOrder>>(
    '[SaleOrders] Load SaleOrders Success',
);

export const clearCurrentSaleOrder = createAction('[SaleOrders] Clear Current SaleOrder');
export const setCurrentSaleOrder = createPayloadAction<ISaleOrder>('[SaleOrders] Set Current SaleOrder');
export const saveSaleOrderRequest = createPayloadAction<ISaleOrder>('[SaleOrders] Save SaleOrder Request');
export const updateSaleOrderRequest = createPayloadAction<ISaleOrder>('[SaleOrders] Update SaleOrder Request');
export const deleteSaleOrderRequest = createPayloadAction<ISaleOrder>('[SaleOrders] Delete SaleOrder Request');

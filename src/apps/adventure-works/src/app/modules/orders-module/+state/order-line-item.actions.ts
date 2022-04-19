import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IOrderLineItem } from '../../../models/odata';

export const loadOrderLineItemsRequest = createPayloadAction<{ orderId: string, odataState: ODataState; }>(
    '[OrderLineItems] Load OrderLineItems Request');
export const loadOrderLineItemsSuccess = createPayloadAction<{ orderId: string, odataResult: ODataResult<IOrderLineItem>; }>(
    '[OrderLineItems] Load OrderLineItems Success');
export const reloadOrderLineItemsRequest = createPayloadAction<string>(
    '[OrderLineItems] Reload OrderLineItems Request');
export const reloadOrderLineItemsSuccess = createPayloadAction<{ orderId: string, odataResult: ODataResult<IOrderLineItem>; }>(
    '[OrderLineItems] Reload OrderLineItems Success');

export const deleteOrderLineItemRequest = createPayloadAction<{ orderId: string; orderLineItem: IOrderLineItem; }>(
    '[OrderLineItems] Delete OrderLineItem Request'); 

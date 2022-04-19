import { createSelector } from '@ngrx/store';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { createEmptyODataResult } from 'imng-kendo-odata';
import { getById } from 'imng-ngrx-utils';
import { ordersFeature } from './order.reducer';
import { IOrderLineItem } from '../../../models/odata';

const selectOrderLineItems = (orderId: string) => createSelector(
  ordersFeature.selectGridData,
  gridData => getById(gridData, orderId) || {
    orderLineItemOData: createEmptyODataResult<IOrderLineItem>(),
    orderLineItemODataState: {},
    orderLineItemPagerSettings: false as (false | PagerSettings),
  },
);

const selectGridData$ = (orderId: string) => createSelector(
  selectOrderLineItems(orderId),
  entity => entity.orderLineItemOData,
);
const selectODataState$ = (orderId: string) => createSelector(
  selectOrderLineItems(orderId),
  entity => entity.orderLineItemODataState,
);
const selectGridPagerSettings$ = (orderId: string) => createSelector(
  selectOrderLineItems(orderId),
  entity => entity.orderLineItemPagerSettings || false,
);

export const orderLineItemQueries = {
  selectOrderLineItems,
  selectGridData$,
  selectODataState$,
  selectGridPagerSettings$,
};


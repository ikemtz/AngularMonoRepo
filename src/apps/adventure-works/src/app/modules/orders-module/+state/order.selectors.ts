import { createSelector } from '@ngrx/store';
import { ordersFeature } from './order.reducer';
import { isTruthy } from 'imng-ngrx-utils';


const getCurrentOrder = ordersFeature.selectCurrentOrder;
const getIsEditOrderActive = createSelector(
  getCurrentOrder,
  entity => isTruthy(entity) && isTruthy((entity as {id: never}).id),
);
const getIsNewOrderActive = createSelector(
  getCurrentOrder,
  entity => isTruthy(entity) && !isTruthy((entity as {id: never}).id),
);
export const dataEntryOrderQueries = {
  getCurrentOrder,
  getIsEditOrderActive,
  getIsNewOrderActive,
};

export const orderQueries = { ...dataEntryOrderQueries };


import { createSelector } from '@ngrx/store';
import { ordersFeature } from './order.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditOrderActive = createSelector(
  ordersFeature.selectCurrentOrder,
  entity => isTruthy(entity) && isTruthy((entity as {id: never}).id),
);
const selectIsNewOrderActive = createSelector(
  ordersFeature.selectCurrentOrder,
  entity => isTruthy(entity) && !isTruthy((entity as {id: never}).id),
);
export const dataEntryOrderQueries = {
  selectCurrentOrder: ordersFeature.selectCurrentOrder,
  selectIsEditOrderActive,
  selectIsNewOrderActive,
};

export const orderQueries = { ...dataEntryOrderQueries };


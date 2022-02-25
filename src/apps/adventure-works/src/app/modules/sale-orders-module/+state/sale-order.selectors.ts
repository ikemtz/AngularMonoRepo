import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SALE_ORDERS_FEATURE_KEY, State, SaleOrdersPartialState } from './sale-order.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getSaleOrdersState = createFeatureSelector< State>(
  SALE_ORDERS_FEATURE_KEY,
);

const getSaleOrders = createSelector(getSaleOrdersState, state => state.gridData);
const getLoading = createSelector(getSaleOrdersState, state => state.loading);
const getGridODataState = createSelector(getSaleOrdersState, state => state.gridODataState);
const getPagerSettings = createSelector(getSaleOrdersState, state => state.gridPagerSettings);
export const odataGridSaleOrderQueries = {
  getSaleOrders,
  getLoading,
  getGridODataState,
  getPagerSettings,
};

const getCurrentSaleOrder = createSelector(
  getSaleOrdersState,
  state => state.currentSaleOrder,
);
const getIsEditSaleOrderActive = createSelector(
  getCurrentSaleOrder,
  entity => isTruthy(entity) && isTruthy(entity?.id),
);
const getIsNewSaleOrderActive = createSelector(
  getCurrentSaleOrder,
  entity => isTruthy(entity) && !isTruthy(entity?.id),
);
export const dataEntrySaleOrderQueries = {
  getCurrentSaleOrder,
  getIsEditSaleOrderActive,
  getIsNewSaleOrderActive,
};

export const saleOrderQueries = { ...odataGridSaleOrderQueries, ...dataEntrySaleOrderQueries };


import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PRODUCTS_FEATURE_KEY, State, ProductsPartialState } from './product.reducer';
import { isTruthy } from 'imng-ngrx-utils';

export const getProductsState = createFeatureSelector< State>(
  PRODUCTS_FEATURE_KEY,
);

const getProducts = createSelector(getProductsState, state => state.gridData);
const getLoading = createSelector(getProductsState, state => state.loading);
const getGridODataState = createSelector(getProductsState, state => state.gridODataState);
const getPagerSettings = createSelector(getProductsState, state => state.gridPagerSettings);
export const odataGridProductQueries = {
  getProducts,
  getLoading,
  getGridODataState,
  getPagerSettings,
};

const getCurrentProduct = createSelector(
  getProductsState,
  state => state.currentProduct,
);
const getIsEditProductActive = createSelector(
  getCurrentProduct,
  entity => isTruthy(entity) && isTruthy(entity?.id),
);
const getIsNewProductActive = createSelector(
  getCurrentProduct,
  entity => isTruthy(entity) && !isTruthy(entity?.id),
);
export const dataEntryProductQueries = {
  getCurrentProduct,
  getIsEditProductActive,
  getIsNewProductActive,
};

export const productQueries = { ...odataGridProductQueries, ...dataEntryProductQueries };


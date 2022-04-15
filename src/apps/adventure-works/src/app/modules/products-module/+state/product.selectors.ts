import { createSelector } from '@ngrx/store';
import { productsFeature } from './product.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const getCurrentProduct = productsFeature.selectCurrentProduct;
const getIsEditProductActive = createSelector(
  getCurrentProduct,
  entity => isTruthy(entity) && isTruthy((entity as { id: never; }).id),
);
const getIsNewProductActive = createSelector(
  getCurrentProduct,
  entity => isTruthy(entity) && !isTruthy((entity as { id: never; }).id),
);
export const dataEntryProductQueries = {
  getCurrentProduct,
  getIsEditProductActive,
  getIsNewProductActive,
};

export const productQueries = { ...dataEntryProductQueries };

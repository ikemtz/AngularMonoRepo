import { createSelector } from '@ngrx/store';
import { productsFeature } from './product.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditProductActive = createSelector(
  productsFeature.selectCurrentProduct,
  (entity) => isTruthy(entity) && isTruthy((entity as { id: never; }).id),
);
const selectIsNewProductActive = createSelector(
  productsFeature.selectCurrentProduct,
  (entity) => isTruthy(entity) && !isTruthy((entity as { id: never; }).id),
);
export const dataEntryProductQueries = {
  selectCurrentProduct: productsFeature.selectCurrentProduct,
  selectIsEditProductActive,
  selectIsNewProductActive,
};

export const productQueries = { ...dataEntryProductQueries };


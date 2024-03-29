import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import { IProduct, IProductCategory, IProductModel } from '../../../models/odata';

import * as productActionTypes from './product.actions';
export const PRODUCTS_FEATURE_KEY = 'products';

export interface State extends KendoODataGridState<IProduct> {
  currentProduct: IProduct | undefined;
  productModels: IProductModel[];
  productCategories: IProductCategory[];
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentProduct: undefined,
  productModels: [],
  productCategories: [],
  loading: true,
};

export const productsFeature = createFeature({
  name: PRODUCTS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(productActionTypes.loadProductsRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(productActionTypes.loadProductsSuccess,
      productActionTypes.reloadProductsSuccess,
      (state, { payload }): State => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null,
      })),
    on(productActionTypes.setCurrentProduct,
      (state, { payload }): State =>
        ({ ...state, currentProduct: payload })),
    on(productActionTypes.clearCurrentProduct,
      (state): State => ({ ...state, currentProduct: undefined })),
    on(productActionTypes.saveProductRequest,
      productActionTypes.updateProductRequest,
      productActionTypes.deleteProductRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(productActionTypes.loadProductModelsSuccess,
      (state, { payload }): State => ({
        ...state,
        productModels: payload.data
      })),
    on(productActionTypes.loadProductCategoriesSuccess,
      (state, { payload }): State => ({
        ...state,
        productCategories: payload.data
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});

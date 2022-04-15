import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { IProduct } from '../../../models/odata';

import * as productActionTypes from './product.actions';
export const PRODUCTS_FEATURE_KEY = 'products';

export interface State extends KendoODataGridState<IProduct> {
  currentProduct: IProduct | undefined;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentProduct: undefined,
  loading: true,
};

export const productsFeature = createFeature({
  name: PRODUCTS_FEATURE_KEY,
  reducer: createReducer(
    initialState,

    on(productActionTypes.loadProductsRequest, (state, { payload }) => ({
      ...state,
      gridODataState: payload,
      loading: true,
      error: null,
    })),
    on(productActionTypes.loadProductsSuccess,
      productActionTypes.reloadProductsSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null,
      })),
    on(productActionTypes.setCurrentProduct, (state, { payload }) => ({ ...state, currentProduct: payload })),
    on(productActionTypes.clearCurrentProduct, state => ({ ...state, currentProduct: undefined })),
    on(
      productActionTypes.saveProductRequest,
      productActionTypes.updateProductRequest,
      productActionTypes.deleteProductRequest,
      state => ({
        ...state,
        loading: true,
      }),
    ),
  )
});
import { createReducer, on, Action } from '@ngrx/store';
import { IProduct } from '../../../models';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';

import * as productActionTypes from './product.actions';
export const PRODUCTS_FEATURE_KEY = 'products';

export interface State extends KendoODataGridState<IProduct> {
  currentProduct?: IProduct;
}

export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  loading: true,
};

const productsReducer = createReducer(
  initialState,
  on(productActionTypes.productsFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  on(productActionTypes.loadProductsRequest, (state, { payload }) => ({
    ...state,
    gridODataState: payload,
    loading: true,
    error: null,
  })),
  on(productActionTypes.loadProductsSuccess, (state, { payload }) => ({
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

);

export function reducer(state: State | undefined, action: Action): State {
  return productsReducer(state, action);
}

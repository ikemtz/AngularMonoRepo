import { createAction } from '@ngrx/store';
import { IProduct } from '../../../models';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';

export const productsFailure = createPayloadAction<{ error: unknown; }>('[Products] Products Failure');

export const loadProductsRequest = createPayloadAction<ODataState>(
    '[Products] Load Products Request');
export const loadProductsSuccess = createPayloadAction<ODataResult<IProduct>>(
    '[Products] Load Products Success',
);

export const clearCurrentProduct = createAction('[Products] Clear Current Product');
export const setCurrentProduct = createPayloadAction<IProduct>('[Products] Set Current Product');
export const saveProductRequest = createPayloadAction<IProduct>('[Products] Save Product Request');
export const updateProductRequest = createPayloadAction<IProduct>('[Products] Update Product Request');
export const deleteProductRequest = createPayloadAction<IProduct>('[Products] Delete Product Request');

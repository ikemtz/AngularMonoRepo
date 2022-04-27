import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IProduct, IProductCategory, IProductModel } from '../../../models/odata';

export const loadProductsRequest = createPayloadAction<ODataState>(
    '[Products] Load Products Request');
export const loadProductsSuccess = createPayloadAction<ODataResult<IProduct>>(
    '[Products] Load Products Success');
export const reloadProductsRequest = createAction(
    '[Products] Reload Products Request');
export const reloadProductsSuccess = createPayloadAction<ODataResult<IProduct>>(
    '[Products] Reload Products Success');

export const clearCurrentProduct = createAction('[Products] Clear Current Product');
export const setCurrentProduct = createPayloadAction<IProduct>('[Products] Set Current Product');
export const saveProductRequest = createPayloadAction<IProduct>('[Products] Save Product Request');
export const updateProductRequest = createPayloadAction<IProduct>('[Products] Update Product Request');
export const deleteProductRequest = createPayloadAction<IProduct>('[Products] Delete Product Request');

export const loadProductModelsRequest = createPayloadAction<ODataState>(
    '[Products] Load ProductModels Request');
export const loadProductModelsSuccess = createPayloadAction<ODataResult<IProductModel>>(
    '[Products] Load ProductModels Success');
export const loadProductCategoriesRequest = createPayloadAction<ODataState>(
    '[Products] Load ProductCategories Request');
export const loadProductCategoriesSuccess = createPayloadAction<ODataResult<IProductCategory>>(
    '[Products] Load ProductCategories Success');

import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as productActionTypes from './product.actions';
import { environment } from '@env';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { switchMap, map } from 'rxjs';
import {
  IProduct,
  ProductProperties,
  IProductModel,
  IProductCategory,
} from '../../../models/odata';
import { productsFeature } from './product.reducer';
import { ProductApiService } from '../products-crud';

@Injectable()
export class ProductEffects {
  private readonly actions$ = inject(Actions);
  private readonly odataService = inject(ODataService);
  private readonly store = inject(Store);
  private readonly productApiService = inject(ProductApiService);

  loadProductsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.loadProductsRequest),
      switchMap(
        (action: ReturnType<typeof productActionTypes.loadProductsRequest>) =>
          this.odataService
            .fetch<IProduct>(
              environment.odataEnpoints.products,
              action.payload,
              {
                dateNullableProps: [
                  ProductProperties.SELL_END_DATE,
                  ProductProperties.DISCONTINUED_DATE,
                ],
              },
            )
            .pipe(
              map((t) => productActionTypes.loadProductsSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  reloadProductsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.reloadProductsRequest),
      concatLatestFrom(() =>
        this.store.select(productsFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<IProduct>(environment.odataEnpoints.products, odataState, {
            bustCache: true,
            dateNullableProps: [
              ProductProperties.SELL_END_DATE,
              ProductProperties.DISCONTINUED_DATE,
            ],
          })
          .pipe(
            map((t) => productActionTypes.reloadProductsSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  saveProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.saveProductRequest),
      switchMap(
        (action: ReturnType<typeof productActionTypes.saveProductRequest>) =>
          this.productApiService.post(action.payload).pipe(
            map(() => productActionTypes.reloadProductsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  updateProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.updateProductRequest),
      switchMap(
        (action: ReturnType<typeof productActionTypes.updateProductRequest>) =>
          this.productApiService.put(action.payload).pipe(
            map(() => productActionTypes.reloadProductsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.deleteProductRequest),
      switchMap(
        (action: ReturnType<typeof productActionTypes.deleteProductRequest>) =>
          this.productApiService.delete(action.payload).pipe(
            map(() => productActionTypes.reloadProductsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  loadProductModelsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.loadProductModelsRequest),
      switchMap(
        (
          action: ReturnType<
            typeof productActionTypes.loadProductModelsRequest
          >,
        ) =>
          this.odataService
            .fetch<IProductModel>(
              environment.odataEnpoints.productModels,
              action.payload,
            )
            .pipe(
              map((t) => productActionTypes.loadProductModelsSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  loadProductCategoriesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.loadProductCategoriesRequest),
      switchMap(
        (
          action: ReturnType<
            typeof productActionTypes.loadProductCategoriesRequest
          >,
        ) =>
          this.odataService
            .fetch<IProductCategory>(
              environment.odataEnpoints.productCategories,
              action.payload,
            )
            .pipe(
              map((t) => productActionTypes.loadProductCategoriesSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });
}

import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';

import * as fromProductsReducer from './product.reducer';
import * as productActionTypes from './product.actions';

import { ProductApiService } from '../products-crud';
import { environment } from '../../../environments/environment';
import { IProduct } from '../../../models';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly dataPersistence: DataPersistence<fromProductsReducer.ProductsPartialState>,
    private readonly productApiService: ProductApiService,
  ) { }

  loadProductsEffect$ = createEffect(() =>
    this.dataPersistence.fetch(productActionTypes.loadProductsRequest, {
      run: (action: ReturnType<typeof productActionTypes.loadProductsRequest>) =>
        this.odataservice
          .fetch<IProduct>(environment.endPoints.products, action.payload)
          .pipe(
            map(t => productActionTypes.loadProductsSuccess(t)),
          ),
      onError: this.exceptionHandler,
    })
  );

  saveProductEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(productActionTypes.saveProductRequest, {
      run: (action: ReturnType<typeof productActionTypes.saveProductRequest>, partialState: fromProductsReducer.ProductsPartialState) =>
        this.productApiService.post(action.payload).pipe(
          map(() => productActionTypes.loadProductsRequest(partialState[fromProductsReducer.PRODUCTS_FEATURE_KEY].gridODataState))),
      onError: this.exceptionHandler,
    })
  );

  updateProductEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(productActionTypes.updateProductRequest, {
      run: (action: ReturnType<typeof productActionTypes.updateProductRequest>, partialState: fromProductsReducer.ProductsPartialState) =>
        this.productApiService.put(action.payload).pipe(
          map(() => productActionTypes.loadProductsRequest(partialState[fromProductsReducer.PRODUCTS_FEATURE_KEY].gridODataState))),
      onError: this.exceptionHandler,
    })
  );

  deleteProductEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(productActionTypes.deleteProductRequest, {
      run: (action: ReturnType<typeof productActionTypes.deleteProductRequest>, partialState: fromProductsReducer.ProductsPartialState) =>
        this.productApiService.delete(action.payload).pipe(
          map(() => productActionTypes.loadProductsRequest(partialState[fromProductsReducer.PRODUCTS_FEATURE_KEY].gridODataState))),
      onError: this.exceptionHandler,
    })
  );

  private exceptionHandler(_action: unknown, error: unknown) {
    console.error('Error', error); // NOSONAR
    return productActionTypes.productsFailure({ error });
  }
}

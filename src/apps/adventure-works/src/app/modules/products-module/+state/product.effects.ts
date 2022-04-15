import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { productsFeature } from './product.reducer';
import * as productActionTypes from './product.actions';
import { environment } from '../../../../environments/environment';

import { ProductApiService } from '../products-crud';
import { IProduct } from '../../../models/odata';

@Injectable()
export class ProductEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private store: Store,
    private readonly productApiService: ProductApiService,
  ) { }

  loadProductsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.loadProductsRequest),
      switchMap((action: ReturnType<typeof productActionTypes.loadProductsRequest>) => this.odataservice
        .fetch<IProduct>(environment.odataEnpoints.products, action.payload)
        .pipe(
          map(t => productActionTypes.loadProductsSuccess(t)),
          handleEffectError(action))));
  });

  reloadProductsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.reloadProductsRequest),
      concatLatestFrom(() => this.store.select(productsFeature.selectGridODataState)),
      switchMap(([action, odataState]) => this.odataservice
        .fetch<IProduct>(environment.odataEnpoints.products, odataState)
        .pipe(
          map(t => productActionTypes.reloadProductsSuccess(t)),
          handleEffectError(action))));
  });

  saveProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.saveProductRequest),
      switchMap((action: ReturnType<typeof productActionTypes.saveProductRequest>) => this.productApiService.post(action.payload).pipe(
        map(() => productActionTypes.reloadProductsRequest()),
        handleEffectError(action))));
  });

  updateProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.updateProductRequest),
      switchMap((action: ReturnType<typeof productActionTypes.updateProductRequest>) => this.productApiService.put(action.payload).pipe(
        map(() => productActionTypes.reloadProductsRequest()),
        handleEffectError(action))));
  });

  deleteProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(productActionTypes.deleteProductRequest),
      switchMap((action: ReturnType<typeof productActionTypes.deleteProductRequest>) => this.productApiService.delete(action.payload).pipe(
        map(() => productActionTypes.reloadProductsRequest()),
        handleEffectError(action))));
  });
}

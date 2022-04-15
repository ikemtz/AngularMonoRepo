import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { productsFeature, ProductsPartialState } from '../+state/product.reducer';
import { productQueries } from '../+state/product.selectors';
import * as productActionTypes from '../+state/product.actions';
import { IProduct } from '../../../models/webapi';

@Injectable()
export class ProductCrudFacade implements IDataEntryFacade<IProduct> {
  loading$ = this.store.pipe(select(productsFeature.selectLoading));
  currentEntity$ = this.store.pipe(select(productQueries.getCurrentProduct));
  isEditActive$ = this.store.pipe(select(productQueries.getIsEditProductActive));
  isNewActive$ = this.store.pipe(select(productQueries.getIsNewProductActive));

  constructor(private readonly store: Store<ProductsPartialState>) { }

  public setCurrentEntity(item: IProduct): void {
    this.store.dispatch(productActionTypes.setCurrentProduct(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(productActionTypes.clearCurrentProduct());
  }

  public saveNewEntity(item: IProduct): void {
    this.store.dispatch(productActionTypes.saveProductRequest(item));
  }

  public updateExistingEntity(item: IProduct): void {
    this.store.dispatch(productActionTypes.updateProductRequest(item));
  }
}

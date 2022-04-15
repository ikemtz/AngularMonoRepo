import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { productsFeature } from '../+state/product.reducer';
import { productQueries } from '../+state/product.selectors';
import * as productActionTypes from '../+state/product.actions';
import { IProduct } from '../../../models/webapi';

@Injectable()
export class ProductCrudFacade implements IDataEntryFacade<IProduct> {
  loading$ = this.store.select(productsFeature.selectLoading);
  currentEntity$ = this.store.select(productQueries.selectCurrentProduct);
  isEditActive$ = this.store.select(productQueries.selectIsEditProductActive);
  isNewActive$ = this.store.select(productQueries.selectIsNewProductActive);

  constructor(private readonly store: Store) { }

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

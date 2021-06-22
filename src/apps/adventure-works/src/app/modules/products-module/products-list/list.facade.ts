import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { ProductsPartialState } from '../+state/product.reducer';
import { productQueries } from '../+state/product.selectors';
import * as productsActionTypes from '../+state/product.actions';
import { IProduct } from '../../../models';

@Injectable()
export class ProductListFacade implements IKendoODataGridFacade<IProduct>, IDataDeleteFacade<IProduct> {
  loading$ = this.store.pipe(select(productQueries.getLoading));
  gridData$ = this.store.pipe(select(productQueries.getProducts));
  gridPagerSettings$ = this.store.pipe(select(productQueries.getPagerSettings));
  gridODataState$ = this.store.pipe(select(productQueries.getGridODataState));

  constructor(private readonly store: Store<ProductsPartialState>) { }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(productsActionTypes.loadProductsRequest(state));
  }

  public deleteExistingEntity(entity: IProduct): void {
    this.store.dispatch(productsActionTypes.deleteProductRequest(entity));
  }
}

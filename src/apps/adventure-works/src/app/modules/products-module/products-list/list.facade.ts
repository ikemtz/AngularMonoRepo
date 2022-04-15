import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { productsFeature, ProductsPartialState } from '../+state/product.reducer';
import * as productActionTypes from '../+state/product.actions';
import { IProduct } from '../../../models/odata';

@Injectable()
export class ProductListFacade implements IKendoODataGridFacade<IProduct>, IDataDeleteFacade<IProduct> {
  loading$ = this.store.pipe(select(productsFeature.selectLoading));
  gridData$ = this.store.pipe(select(productsFeature.selectGridData));
  gridPagerSettings$ = this.store.pipe(select(productsFeature.selectGridPagerSettings));
  gridODataState$ = this.store.pipe(select(productsFeature.selectGridODataState));

  constructor(private readonly store: Store<ProductsPartialState>) { }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(productActionTypes.loadProductsRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(productActionTypes.reloadProductsRequest());
  }

  public deleteExistingEntity(entity: IProduct): void {
    this.store.dispatch(productActionTypes.deleteProductRequest(entity));
  }
}

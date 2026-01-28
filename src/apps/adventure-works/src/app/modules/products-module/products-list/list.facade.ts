import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { productsFeature } from '../+state/product.reducer';
import * as productActionTypes from '../+state/product.actions';
import { IProduct } from '../../../models/odata';

@Injectable()
export class ProductListFacade
  implements IKendoODataGridFacade<IProduct>, IDataDeleteFacade<IProduct>
{
  private readonly store = inject(Store);

  loading$ = this.store.select(productsFeature.selectLoading);
  gridData$ = this.store.select(productsFeature.selectGridData);
  gridPagerSettings$ = this.store.select(
    productsFeature.selectGridPagerSettings,
  );
  gridODataState$ = this.store.select(productsFeature.selectGridODataState);

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

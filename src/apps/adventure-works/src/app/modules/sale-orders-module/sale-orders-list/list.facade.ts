import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { SaleOrdersPartialState } from '../+state/sale-order.reducer';
import { saleOrderQueries } from '../+state/sale-order.selectors';
import * as saleOrdersActionTypes from '../+state/sale-order.actions';
import { ISaleOrder } from '../../../models';

@Injectable()
export class SaleOrderListFacade implements IKendoODataGridFacade<ISaleOrder>, IDataDeleteFacade<ISaleOrder> {
  loading$ = this.store.pipe(select(saleOrderQueries.getLoading));
  gridData$ = this.store.pipe(select(saleOrderQueries.getSaleOrders));
  gridPagerSettings$ = this.store.pipe(select(saleOrderQueries.getPagerSettings));
  gridODataState$ = this.store.pipe(select(saleOrderQueries.getGridODataState));

  constructor(private readonly store: Store<SaleOrdersPartialState>) {}
  reloadEntities(): void {
    throw new Error('Method not implemented.');
  }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(saleOrdersActionTypes.loadSaleOrdersRequest(state));
  }

  public deleteExistingEntity(entity: ISaleOrder): void {
    this.store.dispatch(saleOrdersActionTypes.deleteSaleOrderRequest(entity));
  }
}

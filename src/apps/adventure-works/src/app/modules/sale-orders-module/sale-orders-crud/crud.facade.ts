import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { SaleOrdersPartialState } from '../+state/sale-order.reducer';
import { saleOrderQueries } from '../+state/sale-order.selectors';
import * as saleOrderActionTypes from '../+state/sale-order.actions';
import { ISaleOrder } from '../../../models';

@Injectable()
export class SaleOrderCrudFacade implements IDataEntryFacade<ISaleOrder> {
  loading$ = this.store.pipe(select(saleOrderQueries.getLoading));
  currentEntity$ = this.store.pipe(select(saleOrderQueries.getCurrentSaleOrder));
  isEditActive$ = this.store.pipe(select(saleOrderQueries.getIsEditSaleOrderActive));
  isNewActive$ = this.store.pipe(select(saleOrderQueries.getIsNewSaleOrderActive));

  constructor(private readonly store: Store<SaleOrdersPartialState>) { }

  public setCurrentEntity(item: ISaleOrder): void {
    this.store.dispatch(saleOrderActionTypes.setCurrentSaleOrder(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(saleOrderActionTypes.clearCurrentSaleOrder());
  }

  public saveNewEntity(item: ISaleOrder): void {
    this.store.dispatch(saleOrderActionTypes.saveSaleOrderRequest(item));
  }

  public updateExistingEntity(item: ISaleOrder): void {
    this.store.dispatch(saleOrderActionTypes.updateSaleOrderRequest(item));
  }
}

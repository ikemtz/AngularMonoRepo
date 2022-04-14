import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { ordersFeature, OrdersPartialState } from '../+state/order.reducer';
import { orderQueries } from '../+state/order.selectors';
import * as orderActionTypes from '../+state/order.actions';
import { IOrder } from '../../../models/webapi';

@Injectable()
export class OrderCrudFacade implements IDataEntryFacade<IOrder> {
  loading$ = this.store.pipe(select(ordersFeature.selectLoading));
  currentEntity$ = this.store.pipe(select(orderQueries.getCurrentOrder));
  isEditActive$ = this.store.pipe(select(orderQueries.getIsEditOrderActive));
  isNewActive$ = this.store.pipe(select(orderQueries.getIsNewOrderActive));

  constructor(private readonly store: Store<OrdersPartialState>) { }

  public setCurrentEntity(item: IOrder): void {
    this.store.dispatch(orderActionTypes.setCurrentOrder(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(orderActionTypes.clearCurrentOrder());
  }

  public saveNewEntity(item: IOrder): void {
    this.store.dispatch(orderActionTypes.saveOrderRequest(item));
  }

  public updateExistingEntity(item: IOrder): void {
    this.store.dispatch(orderActionTypes.updateOrderRequest(item));
  }
}

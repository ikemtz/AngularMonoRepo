import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { ordersFeature } from '../+state/order.reducer';
import { orderQueries } from '../+state/order.selectors';
import * as orderActionTypes from '../+state/order.actions';
import { IOrder } from '../../../models/webapi';

@Injectable()
export class OrderCrudFacade implements IDataEntryFacade<IOrder> {
  loading$ = this.store.select(ordersFeature.selectLoading);
  currentEntity$ = this.store.select(orderQueries.selectCurrentOrder);
  isEditActive$ = this.store.select(orderQueries.selectIsEditOrderActive);
  isNewActive$ = this.store.select(orderQueries.selectIsNewOrderActive);

  constructor(private readonly store: Store) { }

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

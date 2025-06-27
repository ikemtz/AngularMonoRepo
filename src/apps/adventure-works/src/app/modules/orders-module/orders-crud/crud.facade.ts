import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { ODataState } from 'imng-kendo-odata';
import { ordersFeature } from '../+state/order.reducer';
import { orderQueries } from '../+state/order.selectors';
import * as orderActionTypes from '../+state/order.actions';
import { IExtOrder } from '../models/ext-order';

@Injectable()
export class OrderCrudFacade implements IDataEntryFacade<IExtOrder> {
  private readonly store = inject(Store);

  loading$ = this.store.select(ordersFeature.selectLoading);
  currentEntity$ = this.store.select(orderQueries.selectCurrentOrder);
  isEditActive$ = this.store.select(orderQueries.selectIsEditOrderActive);
  isNewActive$ = this.store.select(orderQueries.selectIsNewOrderActive);
  customers$ = this.store.select(ordersFeature.selectCustomers);
  shipToAddresses$ = this.store.select(ordersFeature.selectShipToAddresses);
  billToAddresses$ = this.store.select(ordersFeature.selectBillToAddresses);

  public setCurrentEntity(item: IExtOrder): void {
    this.store.dispatch(orderActionTypes.setCurrentOrder(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(orderActionTypes.clearCurrentOrder());
  }

  public saveNewEntity(item: IExtOrder): void {
    this.store.dispatch(orderActionTypes.saveOrderRequest(item));
  }

  public updateExistingEntity(item: IExtOrder): void {
    this.store.dispatch(orderActionTypes.updateOrderRequest(item));
  }

  public loadCustomers(state: ODataState): void {
    this.store.dispatch(orderActionTypes.loadCustomersRequest(state));
  }
  public loadShipToAddresses(state: ODataState): void {
    this.store.dispatch(orderActionTypes.loadShipToAddressesRequest(state));
  }
  public loadBillToAddresses(state: ODataState): void {
    this.store.dispatch(orderActionTypes.loadBillToAddressesRequest(state));
  }
}

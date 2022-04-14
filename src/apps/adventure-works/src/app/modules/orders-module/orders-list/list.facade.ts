import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { ordersFeature, OrdersPartialState } from '../+state/order.reducer';
import * as orderActionTypes from '../+state/order.actions';
import { IOrder } from '../../../models/odata';

@Injectable()
export class OrderListFacade implements IKendoODataGridFacade<IOrder>, IDataDeleteFacade<IOrder> {
  loading$ = this.store.pipe(select(ordersFeature.selectLoading));
  gridData$ = this.store.pipe(select(ordersFeature.selectGridData));
  gridPagerSettings$ = this.store.pipe(select(ordersFeature.selectGridPagerSettings));
  gridODataState$ = this.store.pipe(select(ordersFeature.selectGridODataState));

  constructor(private readonly store: Store<OrdersPartialState>) { }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(orderActionTypes.loadOrdersRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(orderActionTypes.reloadOrdersRequest());
  }

  public deleteExistingEntity(entity: IOrder): void {
    this.store.dispatch(orderActionTypes.deleteOrderRequest(entity));
  }
}

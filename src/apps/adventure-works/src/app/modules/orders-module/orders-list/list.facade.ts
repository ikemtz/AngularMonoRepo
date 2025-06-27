import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { ordersFeature } from '../+state/order.reducer';
import * as orderActionTypes from '../+state/order.actions';
import { IOrder } from '../../../models/odata';
import { IExtOrder } from '../models/ext-order';

@Injectable()
export class OrderListFacade implements IKendoODataGridFacade<IOrder>, IDataDeleteFacade<IOrder> {
  private readonly store = inject(Store);

  loading$ = this.store.select(ordersFeature.selectLoading);
  gridData$ = this.store.select(ordersFeature.selectGridData);
  gridPagerSettings$ = this.store.select(ordersFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(ordersFeature.selectGridODataState);


  public loadEntities(state: ODataState): void {
    this.store.dispatch(orderActionTypes.loadOrdersRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(orderActionTypes.reloadOrdersRequest());
  }

  public deleteExistingEntity(entity: IExtOrder): void {
    this.store.dispatch(orderActionTypes.deleteOrderRequest(entity));
  }
}

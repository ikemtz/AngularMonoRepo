import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ordersFeature } from '../+state/order.reducer';
import * as orderActionTypes from '../+state/order.actions';
import { IOrder } from '../../../models/odata';
import { IPrimeODataTableFacade } from 'imng-prime-table-odata';
import { LazyLoadEvent } from 'primeng/api';

@Injectable()
export class PrimeOrderListFacade implements IPrimeODataTableFacade<IOrder> {
  loading$ = this.store.select(ordersFeature.selectLoading);
  tableData$ = this.store.select(ordersFeature.selectGridData);
  totalRecordCount$ = this.store.select(ordersFeature.selectTotalRecordCount);
  tableState$ = this.store.select(ordersFeature.selectGridState);

  constructor(private readonly store: Store) {}

  public loadEntities(lazyLoadEvent: LazyLoadEvent): void {
    this.store.dispatch(orderActionTypes.loadOrdersRequest(lazyLoadEvent));
  }

  public reloadEntities(): void {
    this.store.dispatch(orderActionTypes.reloadOrdersRequest());
  }
}

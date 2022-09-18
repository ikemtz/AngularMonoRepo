import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { ordersFeature } from '../+state/order.reducer';
import * as orderActionTypes from '../+state/order.actions';
import { IOrder } from '../../../models/odata';
import {
  IPrimeODataTableFacade,
  PrimeTableState,
} from 'imng-prime-table-odata';

@Injectable()
export class PrimeOrderListFacade implements IPrimeODataTableFacade<IOrder> {
  activeEffectCount$ = this.store.select(ordersFeature.selectActiveEffectCount);
  tableData$ = this.store.select(ordersFeature.selectTableData);
  totalRecordCount$ = this.store.select(ordersFeature.selectTotalRecordCount);
  tableState$ = this.store.select(ordersFeature.selectTableState);

  constructor(private readonly store: Store) {}

  public loadEntities(primeTableState: PrimeTableState): void {
    this.store.dispatch(orderActionTypes.loadOrdersRequest(primeTableState));
  }

  public reloadEntities(): void {
    this.store.dispatch(orderActionTypes.reloadOrdersRequest());
  }
}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ODataState } from 'imng-kendo-odata';

import { ordersFeature } from '../+state/order.reducer';
import * as orderActionTypes from '../+state/order.actions';
import { IOrder } from '../../../models/odata';
import { IExtOrder } from '../models/ext-order';
import { IPrimeODataTableFacade } from 'imng-prime-table-odata';
import { map } from 'rxjs';

@Injectable()
export class PrimeOrderListFacade implements IPrimeODataTableFacade<IOrder>  {
  loading$ = this.store.select(ordersFeature.selectLoading);
  tableData$ = this.store.select(ordersFeature.selectGridData).pipe(map(m => m.data));
  totalRecordCount$ = this.store.select(ordersFeature.selectGridData).pipe(map(m => m.total));
  gridPagerSettings$ = this.store.select(ordersFeature.selectGridPagerSettings);
  tableODataQueryState$ = this.store.select(ordersFeature.selectGridODataState);

  constructor(private readonly store: Store) { }

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

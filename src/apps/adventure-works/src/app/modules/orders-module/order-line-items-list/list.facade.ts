import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { applyFilter, ODataResult, ODataState } from 'imng-kendo-odata';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import * as orderLineItemActionTypes from '../+state/order-line-item.actions';
import { ordersFeature } from '../+state/order.reducer';
import { orderLineItemQueries } from '../+state/order-line-item.selectors';
import { IOrderLineItem, OrderLineItemProperties } from '../../../models/odata';

@Injectable()
export class OrderLineItemListFacade implements IKendoODataGridFacade<IOrderLineItem>, IDataDeleteFacade<IOrderLineItem> {
  private readonly store = inject(Store);

  private _parentGridId = '';
  public parentGrid$ = new BehaviorSubject<string>('');
  public get parentGridId() {
    return this._parentGridId;
  }
  public set parentGridId(value: string) {
    this._parentGridId = value;
    this.parentGrid$.next(value);
  }

  loading$ = this.store.select(ordersFeature.selectLoading);
  gridData$: Observable<ODataResult<IOrderLineItem> | undefined> = this.parentGrid$.pipe(
    switchMap(x =>
      this.store.select(orderLineItemQueries.selectGridData$(x))));
  gridPagerSettings$: Observable<false | PagerSettings> = this.parentGrid$.pipe(
    switchMap(x =>
      this.store.select(orderLineItemQueries.selectGridPagerSettings$(x))));
  gridODataState$: Observable<ODataState | undefined> = this.parentGrid$.pipe(
    switchMap(x =>
      this.store.select(orderLineItemQueries.selectODataState$(x))));


  public loadEntities(odataState: ODataState): void {
    odataState = applyFilter({ ...odataState },
      { field: OrderLineItemProperties.ORDER_ID, operator: 'eq', value: this.parentGridId });
    this.store.dispatch(orderLineItemActionTypes.loadOrderLineItemsRequest({
      orderId: this.parentGridId, odataState
    }));
  }

  public reloadEntities(): void {
    this.store.dispatch(orderLineItemActionTypes.reloadOrderLineItemsRequest(this.parentGridId));
  }

  public deleteExistingEntity(orderLineItem: IOrderLineItem): void {
    this.store.dispatch(orderLineItemActionTypes.deleteOrderLineItemRequest({
      orderId: this.parentGridId, orderLineItem
    }));
  }
}

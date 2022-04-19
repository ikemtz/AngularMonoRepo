import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { PagerSettings } from '@progress/kendo-angular-grid';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

import * as orderLineItemActionTypes from '../+state/order-line-item.actions';
import { ordersFeature } from '../+state/order.reducer';
import { orderLineItemQueries } from '../+state/order-line-item.selectors';
import { IOrderLineItem } from '../../../models/odata';

@Injectable()
export class OrderLineItemListFacade implements IKendoODataGridFacade<IOrderLineItem>, IDataDeleteFacade<IOrderLineItem> {
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
  gridData$: Observable<ODataResult<IOrderLineItem>> = this.parentGrid$.pipe(
    switchMap(x =>
      this.store.select(orderLineItemQueries.selectGridData$(x))));
  gridPagerSettings$: Observable<false | PagerSettings> = this.parentGrid$.pipe(
    switchMap(x =>
      this.store.select(orderLineItemQueries.selectGridPagerSettings$(x))));
  gridODataState$: Observable<ODataState> = this.parentGrid$.pipe(
    switchMap(x =>
      this.store.select(orderLineItemQueries.selectODataState$(x))));

  constructor(private readonly store: Store) {
  }

  public loadEntities(odataState: ODataState): void {
    this.store.dispatch(orderLineItemActionTypes.loadOrderLineItemsRequest({
      orderId: this._parentGridId,
      odataState
    }));
  }

  public reloadEntities(): void {
    this.store.dispatch(orderLineItemActionTypes.reloadOrderLineItemsRequest(this._parentGridId));
  }

  public deleteExistingEntity(entity: IOrderLineItem): void {
    this.store.dispatch(orderLineItemActionTypes.deleteOrderLineItemRequest({
      orderId: this._parentGridId,
      orderLineItem: entity
    }));
  }
}

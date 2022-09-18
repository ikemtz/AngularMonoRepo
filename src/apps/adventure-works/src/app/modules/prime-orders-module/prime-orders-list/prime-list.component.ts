import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { PrimeOrderListFacade } from './prime-list.facade';
import { IOrder, OrderProperties } from '../../../models/odata';
import { Observable } from 'rxjs';
import {
  ImngPrimeODataTableBaseComponent,
  PrimeTableState,
} from 'imng-prime-table-odata';

const initialGridState: PrimeTableState = {
  rows: 10,
  first: 0,
  select: [
    OrderProperties.ID,
    OrderProperties.ORDER_ID,
    OrderProperties.DATE,
    OrderProperties.SHIP_DATE,
    OrderProperties.STATUS_TYPE,
    OrderProperties.IS_ONLINE_ORDER,
    OrderProperties.NUM,
    OrderProperties.PURCHASE_ORDER_NUM,
  ],
  multiSortMeta: [{ field: OrderProperties.NUM, order: 1 }],
};

@Component({
  selector: 'aw-prime-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimeOrderListComponent extends ImngPrimeODataTableBaseComponent<
  IOrder,
  PrimeOrderListFacade
> {
  public readonly props = OrderProperties;
  public currentItem: IOrder | undefined;
  public readonly data$: Observable<IOrder[]>;

  constructor(facade: PrimeOrderListFacade, router: Router) {
    super(facade, initialGridState, router);
    this.activeEffectCount$ = facade.activeEffectCount$;
  }
}

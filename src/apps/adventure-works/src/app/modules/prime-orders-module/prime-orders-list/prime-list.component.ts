import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';

import { PrimeOrderListFacade } from './prime-list.facade';
import { IOrder, OrderProperties } from '../../../models/odata';
import { Observable } from 'rxjs';
import {
  IMNG_PRIME_SEARCH_CAPTION,
  IMNG_PRIME_TABLE,
  ImngPrimeODataTableBaseComponent,
  PrimeTableState,
} from 'imng-prime-table-odata';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';

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
  imports: [DatePipe, TableModule, IMNG_PRIME_TABLE, IMNG_PRIME_SEARCH_CAPTION],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class PrimeOrderListComponent extends ImngPrimeODataTableBaseComponent<
  IOrder,
  PrimeOrderListFacade
> {
  public readonly props = OrderProperties;
  public currentItem: IOrder | undefined;
  public readonly data$: Observable<IOrder[]>;

  constructor() {
    const facade = inject(PrimeOrderListFacade);
    super(facade, initialGridState, inject(Router));
    this.activeEffectCount$ = facade.activeEffectCount$;
  }
}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { ODataState } from 'imng-kendo-odata';

import { PrimeOrderListFacade } from './prime-list.facade';
import { IOrder, OrderProperties } from '../../../models/odata';
import { Observable } from 'rxjs';
import { ImngPrimeODataTableBaseComponent } from 'imng-prime-table-odata';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    OrderProperties.ID,
    OrderProperties.ORDER_ID,
    OrderProperties.DATE,
    OrderProperties.SHIP_DATE,
    OrderProperties.STATUS_TYPE,
    OrderProperties.IS_ONLINE_ORDER,
    OrderProperties.NUM,
    OrderProperties.PURCHASE_ORDER_NUM,
  ],
  sort: [
    { field: OrderProperties.ORDER_ID, dir: 'asc' },
  ],
};

@Component({
  selector: 'aw-prime-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimeOrderListComponent extends ImngPrimeODataTableBaseComponent<IOrder, PrimeOrderListFacade> {
  public readonly props = OrderProperties;
  public currentItem: IOrder | undefined;
  public readonly data$: Observable<IOrder[]>;

  constructor(facade: PrimeOrderListFacade,
    router: Router) {
    super(facade, initialGridState, router);
    this.loading$ = facade.loading$;
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}

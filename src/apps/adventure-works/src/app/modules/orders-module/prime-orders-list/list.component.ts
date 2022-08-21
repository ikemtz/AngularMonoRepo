import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { ODataState } from 'imng-kendo-odata';

import { PrimeOrderListFacade } from './list.facade';
import { OrderCrudFacade } from '../orders-crud';
import { CustomerProperties, IOrder, OrderProperties, orderStatusTypeValues, shippingTypeValues } from '../../../models/odata';
import { IExtOrder } from '../models/ext-order';
import { Observable } from 'rxjs';
import { ImngPrimeODataTableBaseComponent } from 'imng-prime-table-odata';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    OrderProperties.ID,
    OrderProperties.ORDER_ID,
    OrderProperties.REVISION_NUM,
    OrderProperties.DATE,
    OrderProperties.DUE_DATE,
    OrderProperties.SHIP_DATE,
    OrderProperties.STATUS_TYPE,
    OrderProperties.IS_ONLINE_ORDER,
    OrderProperties.NUM,
    OrderProperties.PURCHASE_ORDER_NUM,
    OrderProperties.CUSTOMER_ID,
    OrderProperties.SHIP_TO_ADDRESS_ID,
    OrderProperties.BILL_TO_ADDRESS_ID,
    OrderProperties.SHIPPING_TYPE,
    OrderProperties.CREDIT_CARD_APPROVAL_CODE,
    OrderProperties.SUB_TOTAL,
    OrderProperties.TAX_AMT,
    OrderProperties.FREIGHT,
    OrderProperties.TOTAL_DUE,
    OrderProperties.COMMENT,
    OrderProperties.CUSTOMER,
    OrderProperties.SHIP_TO_ADDRESS,
    OrderProperties.BILL_TO_ADDRESS,
  ],
  sort: [
    { field: OrderProperties.ORDER_ID, dir: 'asc' },
  ],
  expanders: [
    { table: OrderProperties.CUSTOMER, selectors: [CustomerProperties.NAME, CustomerProperties.COMPANY_NAME] }
  ]
};

@Component({
  selector: 'aw-prime-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimeOrderListComponent extends ImngPrimeODataTableBaseComponent<IOrder, PrimeOrderListFacade> {
  public readonly props = OrderProperties;
  public readonly orderStatusTypes = orderStatusTypeValues;
  public readonly shippingTypes = shippingTypeValues;
  public currentItem: IOrder | undefined;
  public readonly data$: Observable<IOrder[]>;

  constructor(facade: PrimeOrderListFacade,
    public readonly crudFacade: OrderCrudFacade,
    router: Router) {
    super(facade, initialGridState, router);
    this.loading$ = facade.loading$;
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({ orderLineItemODataState: {}, orderLineItemOData: { data: [], total: 0 }, orderLineItemPagerSettings: false });
  }

  public editItem(item: IExtOrder): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}

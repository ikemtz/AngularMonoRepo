import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { OrderListFacade } from './list.facade';
import { OrderCrudFacade } from '../orders-crud';
import { OrderProperties, CustomerProperties, OrderAddressProperties, IOrder } from '../../../models/odata';

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
    OrderProperties.STATUS,
    OrderProperties.IS_ONLINE_ORDER,
    OrderProperties.NUM,
    OrderProperties.PURCHASE_ORDER_NUM,
    OrderProperties.CUSTOMER_ID,
    OrderProperties.SHIP_TO_ADDRESS_ID,
    OrderProperties.BILL_TO_ADDRESS_ID,
    OrderProperties.CREDIT_CARD_APPROVAL_CODE,
    OrderProperties.SUB_TOTAL,
    OrderProperties.TAX_AMT,
    OrderProperties.FREIGHT,
    OrderProperties.TOTAL_DUE,
    OrderProperties.COMMENT,
  ],
  sort: [
    { field: OrderProperties.ORDER_ID, dir: 'asc' },
  ],
  expanders: [
    {
      table: OrderProperties.CUSTOMER,
      selectors: [
        CustomerProperties.ID,
        CustomerProperties.NUM,
        CustomerProperties.NAME,
        CustomerProperties.COMPANY_NAME,
        CustomerProperties.SALES_AGENT_ID,
        CustomerProperties.EMAIL_ADDRESS,
        CustomerProperties.PHONE,
        CustomerProperties.SALES_AGENT,
      ]
    },
    {
      table: OrderProperties.SHIP_TO_ADDRESS,
      selectors: [
        OrderAddressProperties.ID,
        OrderAddressProperties.LINE_1,
        OrderAddressProperties.LINE_2,
        OrderAddressProperties.CITY,
        OrderAddressProperties.STATE_PROVINCE,
        OrderAddressProperties.COUNTRY_REGION,
        OrderAddressProperties.POSTAL_CODE,
      ]
    },
    {
      table: OrderProperties.BILL_TO_ADDRESS,
      selectors: [
        OrderAddressProperties.ID,
        OrderAddressProperties.LINE_1,
        OrderAddressProperties.LINE_2,
        OrderAddressProperties.CITY,
        OrderAddressProperties.STATE_PROVINCE,
        OrderAddressProperties.COUNTRY_REGION,
        OrderAddressProperties.POSTAL_CODE,
      ]
    },
  ]
};

@Component({
  selector: 'aw-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent extends KendoODataBasedComponent<IOrder, OrderListFacade> {
  public readonly props = OrderProperties;
  public readonly customerProps = CustomerProperties;
  public readonly shipToAddressProps = OrderAddressProperties;
  public readonly billToAddressProps = OrderAddressProperties;
  public currentItem: IOrder | undefined;

  constructor(facade: OrderListFacade,
    public readonly crudFacade: OrderCrudFacade,
    router: Router) {
    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: IOrder): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IOrder): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}

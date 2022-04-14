import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { OrderListFacade } from './list.facade';
import { OrderCrudFacade } from '../orders-crud';
import { IOrder, OrderProperties } from '../../../models/odata';

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
    OrderProperties.SHIP_METHOD,
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
};

@Component({
  selector: 'aw-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent extends KendoODataComponentBase<IOrder, OrderListFacade> {
  public readonly props = OrderProperties;
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
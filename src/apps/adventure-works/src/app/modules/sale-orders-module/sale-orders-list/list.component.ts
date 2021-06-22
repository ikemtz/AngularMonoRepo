import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';

import { SaleOrderListFacade } from './list.facade';
import { SaleOrderCrudFacade } from '../sale-orders-crud';
import { ISaleOrder, SaleOrderProperties } from '../../../models';
import { Router } from '@angular/router';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    SaleOrderProperties.ID,
    SaleOrderProperties.SALES_ORDER_ID,
    SaleOrderProperties.REVISION_NUM,
    SaleOrderProperties.DATE,
    SaleOrderProperties.DUE_DATE,
    SaleOrderProperties.SHIP_DATE,
    SaleOrderProperties.STATUS,
    SaleOrderProperties.IS_ONLINE_ORDER,
    SaleOrderProperties.NUM,
    SaleOrderProperties.PURCHASE_ORDER_NUM,
    SaleOrderProperties.ACCOUNT_NUM,
    SaleOrderProperties.CUSTOMER_ID,
    SaleOrderProperties.SHIP_TO_ADDRESS_ID,
    SaleOrderProperties.BILL_TO_ADDRESS_ID,
    SaleOrderProperties.SHIP_METHOD,
    SaleOrderProperties.CREDIT_CARD_APPROVAL_CODE,
    SaleOrderProperties.SUB_TOTAL,
    SaleOrderProperties.TAX_AMT,
    SaleOrderProperties.FREIGHT,
    SaleOrderProperties.TOTAL_DUE,
    SaleOrderProperties.COMMENT,
    SaleOrderProperties.SHIP_TO_ADDRESS,
    SaleOrderProperties.BILL_TO_ADDRESS,
    SaleOrderProperties.CUSTOMER,
  ],
  sort: [{ field: SaleOrderProperties.ID, dir: 'asc' }],
};

@Component({
  selector: 'aw-sale-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleOrderListComponent extends KendoODataComponentBase<ISaleOrder, SaleOrderListFacade> {
  public readonly props = SaleOrderProperties;
  public currentItem: ISaleOrder | undefined;

  constructor(facade: SaleOrderListFacade, public readonly crudFacade: SaleOrderCrudFacade, router: Router) {
    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: ISaleOrder): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: ISaleOrder): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}

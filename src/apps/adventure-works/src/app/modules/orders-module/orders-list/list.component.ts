import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import {
  ImngKendoGridODataModule,
  KendoODataBasedComponent,
} from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { OrderListFacade } from './list.facade';
import {
  OrderAddComponent,
  OrderCrudFacade,
  OrderEditComponent,
} from '../orders-crud';
import {
  CustomerProperties,
  IOrder,
  OrderProperties,
  orderStatusTypeValues,
  shippingTypeValues,
} from '../../../models/odata';
import { IExtOrder } from '../models/ext-order';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { KENDO_ICONS } from '@progress/kendo-angular-icons';
import { KENDO_MENUS } from '@progress/kendo-angular-menu';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';
import { OrderLineItemListComponent } from '../order-line-items-list';

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
  sort: [{ field: OrderProperties.ORDER_ID, dir: 'asc' }],
  expanders: [
    {
      table: OrderProperties.CUSTOMER,
      selectors: [CustomerProperties.NAME, CustomerProperties.COMPANY_NAME],
    },
  ],
};

@Component({
  selector: 'aw-order-list',
  imports: [
    AsyncPipe,
    SlicePipe,
    KENDO_GRID,
    KENDO_MENUS,
    KENDO_ICONS,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ImngKendoGridFilteringModule,
    ImngDataEntryDialogModule,
    OrderAddComponent,
    OrderEditComponent,
    OrderLineItemListComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderListComponent extends KendoODataBasedComponent<
  IOrder,
  OrderListFacade
> {
  readonly crudFacade = inject(OrderCrudFacade);

  public readonly props = OrderProperties;
  public readonly orderStatusTypes = orderStatusTypeValues;
  public readonly shippingTypes = shippingTypeValues;
  public currentItem: IOrder | undefined;

  constructor() {
    super(inject(OrderListFacade), initialGridState, inject(Router));
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({
      orderLineItemODataState: {},
      orderLineItemOData: { data: [], total: 0 },
      orderLineItemPagerSettings: false,
    });
  }

  public editItem(item: IExtOrder): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IExtOrder): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  Input,
  inject,
} from '@angular/core';
import {
  ImngKendoGridODataModule,
  KendoODataBasedComponent,
} from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { OrderLineItemListFacade } from './list.facade';
import { IOrderLineItem, OrderLineItemProperties } from '../../../models/odata';
import { SlicePipe } from '@angular/common';
import { KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_ICONS } from '@progress/kendo-angular-icons';
import { KENDO_MENUS } from '@progress/kendo-angular-menu';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

const initialGridState: ODataState = {
  take: 5,
  skip: 0,
  selectors: [
    OrderLineItemProperties.ID,
    OrderLineItemProperties.ORDER_ID,
    OrderLineItemProperties.ORDER_QTY,
    OrderLineItemProperties.PRODUCT_ID,
    OrderLineItemProperties.UNIT_PRICE,
    OrderLineItemProperties.UNIT_PRICE_DISCOUNT,
    OrderLineItemProperties.LINE_TOTAL,
    OrderLineItemProperties.ORDER,
    OrderLineItemProperties.PRODUCT,
  ],
  sort: [{ field: OrderLineItemProperties.ORDER_ID, dir: 'asc' }],
};

@Component({
  selector: 'aw-order-line-item-list',
  imports: [
    SlicePipe,
    KENDO_GRID,
    KENDO_MENUS,
    KENDO_ICONS,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ImngKendoGridFilteringModule,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderLineItemListComponent extends KendoODataBasedComponent<
  IOrderLineItem,
  OrderLineItemListFacade
> {
  public readonly props = OrderLineItemProperties;
  public currentItem: IOrderLineItem | undefined;

  constructor() {
    super(inject(OrderLineItemListFacade), initialGridState);
  }

  @Input()
  public set parentGridId(value: string) {
    this.facade.parentGridId = value;
  }

  public deleteItem(item: IOrderLineItem): void {
    this.facade.deleteExistingEntity(item);
  }
}

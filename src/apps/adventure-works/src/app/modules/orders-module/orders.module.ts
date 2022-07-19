import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders.routing';
import { ordersFeature } from './+state/order.reducer';
import { OrderEffects } from './+state/order.effects';

import { OrderListComponent, OrderListFacade } from './orders-list';
import { OrderAddComponent, OrderEditComponent, OrderApiService, OrderCrudFacade } from './orders-crud';
import { OrderLineItemEffects } from './+state/order-line-item.effects';
import { OrderLineItemListComponent, OrderLineItemListFacade } from './order-line-items-list';
import { MenusModule } from '@progress/kendo-angular-menu';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';


@NgModule({
  declarations: [OrderListComponent, OrderAddComponent, OrderEditComponent, OrderLineItemListComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    StoreModule.forFeature(ordersFeature),
    EffectsModule.forFeature([OrderEffects, OrderLineItemEffects]),
    ImngKendoGridFilteringModule,
    DateInputsModule,
    MenusModule,
    DropDownsModule,
  ],
  providers: [
    OrderListFacade,
    OrderCrudFacade,
    OrderApiService,
    OrderLineItemListFacade,
  ],
})
export class OrdersModule { }

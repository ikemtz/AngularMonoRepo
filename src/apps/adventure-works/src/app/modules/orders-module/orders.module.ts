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

//primeNG
import { ImngPrimeTableODataModule } from 'imng-prime-table-odata';
import { PrimeOrderListComponent } from './prime-orders-list/list.component';
import { PrimeOrderListFacade } from './prime-orders-list/list.facade';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [OrderListComponent, OrderAddComponent, OrderEditComponent, OrderLineItemListComponent, PrimeOrderListComponent],
  imports: [
    CommonModule,
    GridModule,
    TableModule,
    ExcelModule,
    PDFModule,
    DialogModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ImngPrimeTableODataModule,
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
    OrderListFacade, PrimeOrderListFacade,
    OrderCrudFacade,
    OrderApiService,
    OrderLineItemListFacade,
  ],
})
export class OrdersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

import { OrdersRoutingModule } from './orders.routing';
import { ordersFeature } from './+state/order.reducer';
import { OrderEffects } from './+state/order.effects';

import { OrderListComponent, OrderListFacade } from './orders-list';
import { OrderAddComponent, OrderEditComponent, OrderApiService, OrderCrudFacade  } from './orders-crud';


@NgModule({
  declarations: [OrderListComponent, OrderAddComponent, OrderEditComponent ],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogModule,
    DateInputsModule,
    DropDownsModule,
    ImngDataEntryDialogModule,
    ImngKendoGridFilteringModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    StoreModule.forFeature(ordersFeature),
    EffectsModule.forFeature([OrderEffects]),
  ],
  providers: [
    OrderListFacade,
    OrderCrudFacade,
    OrderApiService, 
  ],
})
export class OrdersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';

import { SaleOrdersRoutingModule } from './sale-orders.routing';
import * as fromSaleOrdersReducer from './+state/sale-order.reducer';
import { SaleOrderEffects } from './+state/sale-order.effects';

import { SaleOrderListComponent, SaleOrderListFacade } from './sale-orders-list';
import { SaleOrderAddComponent, SaleOrderEditComponent, SaleOrderApiService, SaleOrderCrudFacade  } from './sale-orders-crud';


@NgModule({
  declarations: [ SaleOrderListComponent, SaleOrderAddComponent, SaleOrderEditComponent ],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    SaleOrdersRoutingModule,
    StoreModule.forFeature(fromSaleOrdersReducer.SALE_ORDERS_FEATURE_KEY, fromSaleOrdersReducer.reducer),
    EffectsModule.forFeature([SaleOrderEffects]),
  ],
  providers: [
    DataPersistence,
    SaleOrderListFacade,
    SaleOrderCrudFacade,
    SaleOrderApiService, 
  ],
})
export class SaleOrdersModule { }

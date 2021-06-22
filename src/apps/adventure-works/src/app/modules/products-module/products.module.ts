import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products.routing';
import * as fromProductsReducer from './+state/product.reducer';
import { ProductEffects } from './+state/product.effects';

import { ProductListComponent, ProductListFacade } from './products-list';
import { ProductAddComponent, ProductEditComponent, ProductApiService, ProductCrudFacade  } from './products-crud';


@NgModule({
  declarations: [ ProductListComponent, ProductAddComponent, ProductEditComponent ],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    StoreModule.forFeature(fromProductsReducer.PRODUCTS_FEATURE_KEY, fromProductsReducer.reducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [
    DataPersistence,
    ProductListFacade,
    ProductCrudFacade,
    ProductApiService, 
  ],
})
export class ProductsModule { }

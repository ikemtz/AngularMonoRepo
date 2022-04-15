import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products.routing';
import { productsFeature } from './+state/product.reducer';
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
    DialogModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    StoreModule.forFeature(productsFeature),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [
    ProductListFacade,
    ProductCrudFacade,
    ProductApiService, 
  ],
})
export class ProductsModule { }

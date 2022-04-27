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

import { ProductsRoutingModule } from './products.routing';
import { productsFeature } from './+state/product.reducer';
import { ProductEffects } from './+state/product.effects';

import { ProductListComponent, ProductListFacade } from './products-list';
import { ProductAddComponent, ProductEditComponent, ProductApiService, ProductCrudFacade  } from './products-crud';


@NgModule({
  declarations: [ProductListComponent, ProductAddComponent, ProductEditComponent ],
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  GridModule,
  ExcelModule,
  PDFModule,
} from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

import { CustomersRoutingModule } from './customers.routing';
import { customersFeature } from './+state/customer.reducer';
import { CustomerEffects } from './+state/customer.effects';

import { CustomerListComponent, CustomerListFacade } from './customers-list';
import {
  CustomerAddComponent,
  CustomerEditComponent,
  CustomerApiService,
  CustomerCrudFacade,
} from './customers-crud';

@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerAddComponent,
    CustomerEditComponent,
  ],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogModule,
    DropDownsModule,
    ImngDataEntryDialogModule,
    ImngKendoGridFilteringModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    StoreModule.forFeature(customersFeature),
    EffectsModule.forFeature([CustomerEffects]),
  ],
  providers: [CustomerListFacade, CustomerCrudFacade, CustomerApiService],
})
export class CustomersModule {}

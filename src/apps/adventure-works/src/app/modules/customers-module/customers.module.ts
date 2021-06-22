import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';

import { CustomersRoutingModule } from './customers.routing';
import * as fromCustomersReducer from './+state/customer.reducer';
import { CustomerEffects } from './+state/customer.effects';

import { CustomerListComponent, CustomerListFacade } from './customers-list';
import { CustomerAddComponent, CustomerEditComponent, CustomerApiService, CustomerCrudFacade  } from './customers-crud';


@NgModule({
  declarations: [ CustomerListComponent, CustomerAddComponent, CustomerEditComponent ],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    CustomersRoutingModule,
    StoreModule.forFeature(fromCustomersReducer.CUSTOMERS_FEATURE_KEY, fromCustomersReducer.reducer),
    EffectsModule.forFeature([CustomerEffects]),
  ],
  providers: [
    DataPersistence,
    CustomerListFacade,
    CustomerCrudFacade,
    CustomerApiService, 
  ],
})
export class CustomersModule { }

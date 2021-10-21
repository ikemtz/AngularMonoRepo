import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesRoutingModule } from './employees.routing.module';
import * as fromEmployeesReducer from './+state/employee.reducer';
import { EmployeeEffects } from './+state/employee.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { EmployeeListComponent, EmployeeListFacade } from './employees-list';
import { EmployeeAddComponent, EmployeeEditComponent, EmployeeApiService, EmployeeCrudFacade } from './employees-crud';
import { DataPersistence } from '@nrwl/angular';
import { DialogModule } from '@progress/kendo-angular-dialog';

@NgModule({
  declarations: [EmployeeListComponent, EmployeeAddComponent, EmployeeEditComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    DialogModule,
    PDFModule,
    ImngKendoGridODataModule,
    ImngKendoGridFilteringModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    EmployeesRoutingModule,
    StoreModule.forFeature(fromEmployeesReducer.EMPLOYEES_FEATURE_KEY, fromEmployeesReducer.reducer),
    EffectsModule.forFeature([EmployeeEffects]),
  ],
  providers: [EmployeeApiService, EmployeeListFacade, EmployeeCrudFacade, DataPersistence],
})
export class EmployeesModule {}

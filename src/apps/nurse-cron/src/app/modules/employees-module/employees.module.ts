import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { EmployeesRoutingModule } from './employees.routing.module';
import * as fromEmployeesReducer from './+state/employee.reducer';
import { EmployeeEffects } from './+state/employee.effects';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';

import { EmployeeListComponent, EmployeeListFacade } from './employees-list';
import { EmployeeAddComponent, EmployeeEditComponent, EmployeeApiService, EmployeeCrudFacade } from './employees-crud';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [EmployeeListComponent, EmployeeAddComponent, EmployeeEditComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    GridModule,
    ExcelModule,
    PDFModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    StoreModule.forFeature(fromEmployeesReducer.EMPLOYEES_FEATURE_KEY, fromEmployeesReducer.reducer),
    EffectsModule.forFeature([EmployeeEffects]),
  ],
  providers: [EmployeeApiService, EmployeeListFacade, EmployeeCrudFacade]
})
export class EmployeesModule { }

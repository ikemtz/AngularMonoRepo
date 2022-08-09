import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MenusModule } from "@progress/kendo-angular-menu";
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

import { EmployeesRoutingModule } from './employees.routing';
import { employeesFeature } from './+state/employee.reducer';
import { EmployeeEffects } from './+state/employee.effects';

import { EmployeeListComponent, EmployeeListFacade } from './employees-list';
import { EmployeeAddComponent, EmployeeEditComponent, EmployeeApiService, EmployeeCrudFacade } from './employees-crud';


@NgModule({
  declarations: [EmployeeListComponent, EmployeeAddComponent, EmployeeEditComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogModule,
    DateInputsModule,
    MenusModule,
    ImngDataEntryDialogModule,
    ImngKendoGridFilteringModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    StoreModule.forFeature(employeesFeature),
    EffectsModule.forFeature([EmployeeEffects]),
  ],
  providers: [
    EmployeeListFacade,
    EmployeeCrudFacade,
    EmployeeApiService,
  ],
})
export class EmployeesModule { }

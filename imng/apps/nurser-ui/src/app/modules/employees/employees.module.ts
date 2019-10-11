import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesRoutingModule } from './employees-routing.module';
import { ListComponent } from './list/list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  EMPLOYEES_FEATURE_KEY,
  initialState as employeesInitialState,
  employeesReducer
} from './+state/employees.reducer';
import { EmployeesEffects } from './+state/employees.effects';
import { EmployeesFacade } from './+state/employees.facade';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusCircle, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeApiService } from './services/employee.api.service';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    GridModule,
    DialogModule,
    ExcelModule,
    PDFModule,
    StoreModule.forFeature(EMPLOYEES_FEATURE_KEY, employeesReducer, { initialState: employeesInitialState }),
    EffectsModule.forFeature([EmployeesEffects]),
    FontAwesomeModule,
    DatePickerModule,
    ReactiveFormsModule
  ],
  providers: [EmployeesFacade, EmployeeApiService]
})
export class EmployeesModule {
  constructor() {
    library.add(faPlusCircle, faSpinner);
  }
}

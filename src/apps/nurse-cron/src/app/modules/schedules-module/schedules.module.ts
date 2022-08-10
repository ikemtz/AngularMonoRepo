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

import { SchedulesRoutingModule } from './schedules.routing';
import { schedulesFeature } from './+state/schedule.reducer';
import { ScheduleEffects } from './+state/schedule.effects';

import { ScheduleListComponent, ScheduleListFacade } from './schedules-list';
import { ScheduleAddComponent, ScheduleEditComponent, ScheduleApiService, ScheduleCrudFacade  } from './schedules-crud';


@NgModule({
  declarations: [ScheduleListComponent, ScheduleAddComponent, ScheduleEditComponent ],
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
    SchedulesRoutingModule,
    StoreModule.forFeature(schedulesFeature),
    EffectsModule.forFeature([ScheduleEffects]),
  ],
  providers: [
    ScheduleListFacade,
    ScheduleCrudFacade,
    ScheduleApiService, 
  ],
})
export class SchedulesModule { }

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
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { MenusModule } from '@progress/kendo-angular-menu';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

import { UnitsRoutingModule } from './units.routing';
import { unitsFeature } from './+state/unit.reducer';
import { UnitEffects } from './+state/unit.effects';

import { UnitListComponent, UnitListFacade } from './units-list';
import {
  UnitAddComponent,
  UnitEditComponent,
  UnitApiService,
  UnitCrudFacade,
} from './units-crud';

@NgModule({
  declarations: [UnitListComponent, UnitAddComponent, UnitEditComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogModule,
    DateInputsModule,
    DropDownsModule,
    MenusModule,
    ImngDataEntryDialogModule,
    ImngKendoGridFilteringModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ReactiveFormsModule,
    UnitsRoutingModule,
    StoreModule.forFeature(unitsFeature),
    EffectsModule.forFeature([UnitEffects]),
  ],
  providers: [UnitListFacade, UnitCrudFacade, UnitApiService],
})
export class UnitsModule {}

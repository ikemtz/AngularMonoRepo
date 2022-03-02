import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';

import { UnitsRoutingModule } from './units.routing.module';
import * as fromUnitsReducer from './+state/unit.reducer';
import { UnitEffects } from './+state/unit.effects';

import { UnitListComponent, UnitListFacade } from './units-list';
import { UnitAddComponent, UnitEditComponent, UnitApiService, UnitCrudFacade } from './units-crud';
import { DataPersistence } from '@nrwl/angular';

@NgModule({
  declarations: [UnitListComponent, UnitAddComponent, UnitEditComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    UnitsRoutingModule,
    StoreModule.forFeature(fromUnitsReducer.UNITS_FEATURE_KEY, fromUnitsReducer.reducer),
    EffectsModule.forFeature([UnitEffects]),
  ],
  providers: [UnitApiService, UnitListFacade, UnitCrudFacade, DataPersistence],
})
export class UnitsModule {}

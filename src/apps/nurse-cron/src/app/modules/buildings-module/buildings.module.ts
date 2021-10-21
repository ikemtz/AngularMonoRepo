import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';

import { BuildingsRoutingModule } from './buildings.routing.module';
import * as fromBuildingsReducer from './+state/building.reducer';
import { BuildingEffects } from './+state/building.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BuildingListComponent, BuildingListFacade } from './buildings-list';
import { BuildingAddComponent, BuildingEditComponent, BuildingApiService, BuildingCrudFacade } from './buildings-crud';
import { DataPersistence } from '@nrwl/angular';

@NgModule({
  declarations: [BuildingListComponent, BuildingAddComponent, BuildingEditComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BuildingsRoutingModule,
    StoreModule.forFeature(fromBuildingsReducer.BUILDINGS_FEATURE_KEY, fromBuildingsReducer.reducer),
    EffectsModule.forFeature([BuildingEffects]),
  ],
  providers: [BuildingApiService, BuildingListFacade, BuildingCrudFacade, DataPersistence],
})
export class BuildingsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MenusModule } from '@progress/kendo-angular-menu';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

import { BuildingsRoutingModule } from './buildings.routing';
import { buildingsFeature } from './+state/building.reducer';
import { BuildingEffects } from './+state/building.effects';

import { BuildingListComponent, BuildingListFacade } from './buildings-list';
import {
  BuildingAddComponent,
  BuildingEditComponent,
  BuildingApiService,
  BuildingCrudFacade,
} from './buildings-crud';

@NgModule({
  imports: [
    CommonModule,
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
    BuildingsRoutingModule,
    StoreModule.forFeature(buildingsFeature),
    EffectsModule.forFeature([BuildingEffects]),
    BuildingListComponent,
    BuildingAddComponent,
    BuildingEditComponent,
  ],
  providers: [BuildingListFacade, BuildingCrudFacade, BuildingApiService],
})
export class BuildingsModule {}

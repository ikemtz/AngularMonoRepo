import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
{import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
 GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { MenusModule } from "@progress/kendo-angular-menu";
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGriimport { EffectsModule } from '@ngrx/effects';mimport { concatLatestFrom } from '@ngrx/operators';
port { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

import { BuildingsRoutingModule } from './buildings.routing';
import { buildingsFeature } from './+state/building.reducer';
import { BuildingEffects } from './+state/building.effects';

import { BuildingListComponent, BuildingListFacade } from './buildings-list';
import { BuildingAddComponent, BuildingEditComponent, BuildingApiService, BuildingCrudFacade  } from './buildings-crud';


@NgModule({
  declarations: [BuildingListComponent, BuildingAddComponent, BuildingEditComponent ],
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
    BuildingsRoutingModule,
    StoreModule.forFeature(buildingsFeature),
    EffectsModule.forFeature([BuildingEffects]),
  ],
  providers: [
    BuildingListFacade,
    BuildingCrudFacade,
    BuildingApiService, 
  ],
})
export class BuildingsModule { }

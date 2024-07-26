import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
{import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
 GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { MenusModule } from "@progress/kendo-angular-menu";
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialimport { EffectsModule } from '@ngrx/effects';timport { concatLatestFrom } from '@ngrx/operators';
 { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

import { CompetenciesRoutingModule } from './competencies.routing';
import { competenciesFeature } from './+state/competency.reducer';
import { CompetencyEffects } from './+state/competency.effects';

import { CompetencyListComponent, CompetencyListFacade } from './competencies-list';
import { CompetencyAddComponent, CompetencyEditComponent, CompetencyApiService, CompetencyCrudFacade  } from './competencies-crud';


@NgModule({
  declarations: [CompetencyListComponent, CompetencyAddComponent, CompetencyEditComponent ],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    DialogModule,
    MenusModule,
    ImngDataEntryDialogModule,
    ImngKendoGridFilteringModule,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ReactiveFormsModule,
    CompetenciesRoutingModule,
    StoreModule.forFeature(competenciesFeature),
    EffectsModule.forFeature([CompetencyEffects]),
  ],
  providers: [
    CompetencyListFacade,
    CompetencyCrudFacade,
    CompetencyApiService, 
  ],
})
export class CompetenciesModule { }

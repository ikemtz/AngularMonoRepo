import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';

import { CompetenciesRoutingModule } from './competencies.routing.module';
import * as fromCompetenciesReducer from './+state/competency.reducer';
import { CompetencyEffects } from './+state/competency.effects';

import { CompetencyListComponent, CompetencyListFacade } from './competencies-list';
import {
  CompetencyAddComponent,
  CompetencyEditComponent,
  CompetencyApiService,
  CompetencyCrudFacade,
} from './competencies-crud';
import { DataPersistence } from '@nrwl/angular';

@NgModule({
  declarations: [CompetencyListComponent, CompetencyAddComponent, CompetencyEditComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    CompetenciesRoutingModule,
    StoreModule.forFeature(fromCompetenciesReducer.COMPETENCIES_FEATURE_KEY, fromCompetenciesReducer.reducer),
    EffectsModule.forFeature([CompetencyEffects]),
  ],
  providers: [CompetencyApiService, CompetencyListFacade, CompetencyCrudFacade, DataPersistence],
})
export class CompetenciesModule {}

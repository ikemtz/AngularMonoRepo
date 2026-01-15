import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { MenusModule } from '@progress/kendo-angular-menu';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

import { CompetenciesRoutingModule } from './competencies.routing';
import { competenciesFeature } from './+state/competency.reducer';
import { CompetencyEffects } from './+state/competency.effects';

import {
  CompetencyListComponent,
  CompetencyListFacade,
} from './competencies-list';
import {
  CompetencyAddComponent,
  CompetencyEditComponent,
  CompetencyApiService,
  CompetencyCrudFacade,
} from './competencies-crud';

@NgModule({
  imports: [
    CommonModule,
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
    CompetencyListComponent,
    CompetencyAddComponent,
    CompetencyEditComponent,
  ],
  providers: [CompetencyListFacade, CompetencyCrudFacade, CompetencyApiService],
})
export class CompetenciesModule {}

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

import { CertificationsRoutingModule } from './certifications.routing';
import { certificationsFeature } from './+state/certification.reducer';
import { CertificationEffects } from './+state/certification.effects';

import {
  CertificationListComponent,
  CertificationListFacade,
} from './certifications-list';
import {
  CertificationAddComponent,
  CertificationEditComponent,
  CertificationApiService,
  CertificationCrudFacade,
} from './certifications-crud';

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
    CertificationsRoutingModule,
    StoreModule.forFeature(certificationsFeature),
    EffectsModule.forFeature([CertificationEffects]),
    CertificationListComponent,
    CertificationAddComponent,
    CertificationEditComponent,
  ],
  providers: [
    CertificationListFacade,
    CertificationCrudFacade,
    CertificationApiService,
  ],
})
export class CertificationsModule {}

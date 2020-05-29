import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';

import { CertificationsRoutingModule } from './certifications.routing.module';
import * as fromCertificationsReducer from './+state/certification.reducer';
import { CertificationEffects } from './+state/certification.effects';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { CertificationListComponent, CertificationListFacade } from './certifications-list';
import { CertificationAddComponent, CertificationEditComponent, CertificationApiService, CertificationCrudFacade  } from './certifications-crud';


@NgModule({
  declarations: [ CertificationListComponent, CertificationAddComponent, CertificationEditComponent ],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CertificationsRoutingModule,
    StoreModule.forFeature(fromCertificationsReducer.CERTIFICATIONS_FEATURE_KEY, fromCertificationsReducer.reducer),
    EffectsModule.forFeature([CertificationEffects]),
  ],
  providers:[ CertificationApiService, CertificationListFacade, CertificationCrudFacade ]
})
export class CertificationsModule { }

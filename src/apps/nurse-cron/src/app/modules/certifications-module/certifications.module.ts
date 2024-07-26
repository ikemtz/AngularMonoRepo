import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
{import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
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

import { CertificationsRoutingModule } from './certifications.routing';
import { certificationsFeature } from './+state/certification.reducer';
import { CertificationEffects } from './+state/certification.effects';

import { CertificationListComponent, CertificationListFacade } from './certifications-list';
import { CertificationAddComponent, CertificationEditComponent, CertificationApiService, CertificationCrudFacade  } from './certifications-crud';


@NgModule({
  declarations: [CertificationListComponent, CertificationAddComponent, CertificationEditComponent ],
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
    CertificationsRoutingModule,
    StoreModule.forFeature(certificationsFeature),
    EffectsModule.forFeature([CertificationEffects]),
  ],
  providers: [
    CertificationListFacade,
    CertificationCrudFacade,
    CertificationApiService, 
  ],
})
export class CertificationsModule { }

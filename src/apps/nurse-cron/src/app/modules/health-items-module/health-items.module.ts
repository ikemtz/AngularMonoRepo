import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
{import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
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

import { HealthItemsRoutingModule } from './health-items.routing';
import { healthItemsFeature } from './+state/health-item.reducer';
import { HealthItemEffects } from './+state/health-item.effects';

import { HealthItemListComponent, HealthItemListFacade } from './health-items-list';
import { HealthItemAddComponent, HealthItemEditComponent, HealthItemApiService, HealthItemCrudFacade  } from './health-items-crud';


@NgModule({
  declarations: [HealthItemListComponent, HealthItemAddComponent, HealthItemEditComponent ],
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
    HealthItemsRoutingModule,
    StoreModule.forFeature(healthItemsFeature),
    EffectsModule.forFeature([HealthItemEffects]),
  ],
  providers: [
    HealthItemListFacade,
    HealthItemCrudFacade,
    HealthItemApiService, 
  ],
})
export class HealthItemsModule { }

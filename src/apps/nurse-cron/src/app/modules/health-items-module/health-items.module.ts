import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridODataModule } from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';

import { HealthItemsRoutingModule } from './health-items.routing.module';
import * as fromHealthItemsReducer from './+state/health-item.reducer';
import { HealthItemEffects } from './+state/health-item.effects';

import { HealthItemListComponent, HealthItemListFacade } from './health-items-list';
import {
  HealthItemAddComponent,
  HealthItemEditComponent,
  HealthItemApiService,
  HealthItemCrudFacade,
} from './health-items-crud';
import { DataPersistence } from '@nrwl/angular';

@NgModule({
  declarations: [HealthItemListComponent, HealthItemAddComponent, HealthItemEditComponent],
  imports: [
    CommonModule,
    GridModule,
    ExcelModule,
    PDFModule,
    ImngKendoGridODataModule,
    ImngDataEntryDialogModule,
    ReactiveFormsModule,
    HealthItemsRoutingModule,
    StoreModule.forFeature(fromHealthItemsReducer.HEALTH_ITEMS_FEATURE_KEY, fromHealthItemsReducer.reducer),
    EffectsModule.forFeature([HealthItemEffects]),
  ],
  providers: [HealthItemApiService, HealthItemListFacade, HealthItemCrudFacade, DataPersistence],
})
export class HealthItemsModule {}

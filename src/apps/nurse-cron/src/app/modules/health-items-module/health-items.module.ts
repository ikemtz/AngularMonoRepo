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

import { HealthItemsRoutingModule } from './health-items.routing';
import { healthItemsFeature } from './+state/health-item.reducer';
import { HealthItemEffects } from './+state/health-item.effects';

import {
  HealthItemListComponent,
  HealthItemListFacade,
} from './health-items-list';
import {
  HealthItemAddComponent,
  HealthItemEditComponent,
  HealthItemApiService,
  HealthItemCrudFacade,
} from './health-items-crud';

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
    HealthItemsRoutingModule,
    StoreModule.forFeature(healthItemsFeature),
    EffectsModule.forFeature([HealthItemEffects]),
    HealthItemListComponent,
    HealthItemAddComponent,
    HealthItemEditComponent,
  ],
  providers: [HealthItemListFacade, HealthItemCrudFacade, HealthItemApiService],
})
export class HealthItemsModule {}

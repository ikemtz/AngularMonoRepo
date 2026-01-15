import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMNG_KENDO_GRID_MULTISELECT_FILTER } from './multi-select-filter/multi-select-filter.component';
import { IMNG_KENDO_GRID_UUID_FILTER } from './uuid-filter/uuid-filter.component';

@NgModule({
  imports: [
    CommonModule,
    IMNG_KENDO_GRID_MULTISELECT_FILTER,
    IMNG_KENDO_GRID_UUID_FILTER,
  ],
  exports: [IMNG_KENDO_GRID_MULTISELECT_FILTER, IMNG_KENDO_GRID_UUID_FILTER],
})
export class ImngKendoGridFilteringModule {}

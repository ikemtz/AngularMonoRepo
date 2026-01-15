import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMNG_KENDO_GRID_ARRAY } from './kendo-array-grid.directive';
import { ImngKendoGridModule } from 'imng-kendo-grid';

@NgModule({
  imports: [CommonModule, ImngKendoGridModule, IMNG_KENDO_GRID_ARRAY],
  exports: [IMNG_KENDO_GRID_ARRAY],
})
export class ImngKendoGridArrayModule {}

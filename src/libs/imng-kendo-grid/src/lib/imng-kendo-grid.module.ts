import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMNG_KENDO_GRID_HEADER } from './grid-header-component/grid-header.component';
import { IMNG_KENDO_GRID_CHILD_COLUMN_TEMPLATE } from './kendo-child-column-component/kendo-child-column-template.component';
import { IMNG_KENDO_COPY } from './kendo-copy-component/kendo-copy.component';

@NgModule({
  imports: [
    CommonModule,
    IMNG_KENDO_GRID_HEADER,
    IMNG_KENDO_GRID_CHILD_COLUMN_TEMPLATE,
    IMNG_KENDO_COPY,
  ],
  exports: [
    IMNG_KENDO_GRID_HEADER,
    IMNG_KENDO_GRID_CHILD_COLUMN_TEMPLATE,
    IMNG_KENDO_COPY,
  ],
})
export class ImngKendoGridModule {}

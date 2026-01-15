import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMNG_KENDO_GRID_ODATA } from './kendo-odata-grid.directive';
import { ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridModule } from 'imng-kendo-grid';

@NgModule({
  imports: [
    CommonModule,
    PDFModule,
    ExcelModule,
    ImngKendoGridModule,
    IMNG_KENDO_GRID_ODATA,
  ],
  exports: [IMNG_KENDO_GRID_ODATA],
})
export class ImngKendoGridODataModule {}

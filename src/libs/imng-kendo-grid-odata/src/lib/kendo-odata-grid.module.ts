import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMNG_KENDO_GRID_ODATA } from './kendo-odata-grid.directive';
import { ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { IMNG_KENDO_GRID_ODATA_HEADER } from './grid-odata-header-component/grid-odata-header.component';

@NgModule({
  imports: [
    CommonModule,
    PDFModule,
    ExcelModule,
    ImngKendoGridModule,
    IMNG_KENDO_GRID_ODATA,
    IMNG_KENDO_GRID_ODATA_HEADER,
  ],
  exports: [IMNG_KENDO_GRID_ODATA, IMNG_KENDO_GRID_ODATA_HEADER],
})
export class ImngKendoGridODataModule { }

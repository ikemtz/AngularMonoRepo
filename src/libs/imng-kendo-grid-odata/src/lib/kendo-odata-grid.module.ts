import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngODataGridDirective } from './kendo-odata-grid.directive';
import { ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { ImngKendoGridModule } from 'imng-kendo-grid';

@NgModule({
  declarations: [ImngODataGridDirective],
  imports: [CommonModule, PDFModule, ExcelModule, ImngKendoGridModule],
  exports: [ImngODataGridDirective],
})
export class ImngKendoGridODataModule {}

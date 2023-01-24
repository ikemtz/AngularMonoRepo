import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngODataGridDirective } from './kendo-odata-grid.directive';
import {
  ExcelModule,
  GridModule,
  PDFModule,
} from '@progress/kendo-angular-grid';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { IconsModule } from '@progress/kendo-angular-icons';

@NgModule({
  declarations: [ImngODataGridDirective],
  imports: [
    CommonModule,
    GridModule,
    IconsModule,
    PDFModule,
    ExcelModule,
    ImngKendoGridModule,
  ],
  exports: [ImngODataGridDirective],
})
export class ImngKendoGridODataModule {}

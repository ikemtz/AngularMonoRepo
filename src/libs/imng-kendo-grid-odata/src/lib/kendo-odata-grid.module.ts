import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngODataGridDirective } from './kendo-odata-grid.directive';
import { ImngGridChildColumnTemplateComponent } from './kendo-child-column-template/kendo-child-column-template.component';
import { ImngGridHeaderComponent } from './grid-header/grid-header.component';
import { ExcelModule, GridModule, PDFModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [ImngODataGridDirective, ImngGridChildColumnTemplateComponent, ImngGridHeaderComponent],
  imports: [CommonModule, GridModule, PDFModule, ExcelModule],
  exports: [ImngODataGridDirective, ImngGridChildColumnTemplateComponent, ImngGridHeaderComponent],
})
export class ImngKendoGridODataModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngODataGridDirective } from './kendo-odata-grid.directive';
import { ImngGridChildColumTemplateComponent } from './kendo-child-colum-template/kendo-child-colum-template.component';

@NgModule({
  declarations: [ImngODataGridDirective, ImngGridChildColumTemplateComponent],
  imports: [CommonModule],
  exports: [ImngODataGridDirective, ImngGridChildColumTemplateComponent],
})
export class ImngKendoGridODataModule { }

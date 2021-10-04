import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngODataGridDirective } from './kendo-odata-grid.directive';
import { ImngGridChildColumnTemplateComponent } from './kendo-child-column-template/kendo-child-column-template.component';

@NgModule({
  declarations: [ImngODataGridDirective, ImngGridChildColumnTemplateComponent],
  imports: [CommonModule],
  exports: [ImngODataGridDirective, ImngGridChildColumnTemplateComponent],
})
export class ImngKendoGridODataModule { }

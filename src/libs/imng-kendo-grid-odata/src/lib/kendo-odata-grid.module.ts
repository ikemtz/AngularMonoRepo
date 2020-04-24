import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngODataGridDirective } from './kendo-odata-grid.directive';

@NgModule({
  declarations: [ImngODataGridDirective],
  imports: [CommonModule],
  exports: [ImngODataGridDirective],
})
export class ImngKendoGridODataModule {}

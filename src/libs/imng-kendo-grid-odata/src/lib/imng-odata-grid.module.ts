import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngODataGridDirective } from './imng-odata-grid.directive';

@NgModule({
  declarations: [ImngODataGridDirective],
  imports: [CommonModule],
  exports: [ImngODataGridDirective],
})
export class ImngODataGridModule {}

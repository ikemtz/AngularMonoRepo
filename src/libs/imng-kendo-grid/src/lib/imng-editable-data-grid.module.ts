import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngEditableDataGridDirective } from './imng-editable-data-grid.directive';

@NgModule({
  declarations: [ImngEditableDataGridDirective],
  imports: [CommonModule],
  exports: [ImngEditableDataGridDirective],
})
export class ImngEditableDataGridModule {}

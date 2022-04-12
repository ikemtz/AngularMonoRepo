import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngEditableDataGridDirective } from './editable-data-grid.directive';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [ImngEditableDataGridDirective],
  imports: [CommonModule, GridModule],
  exports: [ImngEditableDataGridDirective],
})
export class ImngKendoGridEditableModule {}

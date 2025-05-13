import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngArrayGridDirective } from './kendo-array-grid.directive';
import { ImngKendoGridModule } from 'imng-kendo-grid';

@NgModule({
  declarations: [ImngArrayGridDirective],
  imports: [CommonModule, ImngKendoGridModule],
  exports: [ImngArrayGridDirective],
})
export class ImngKendoGridArrayModule {}

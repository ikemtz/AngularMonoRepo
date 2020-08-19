import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngArrayGridDirective } from './kendo-array-grid.directive';

@NgModule({
  declarations: [ImngArrayGridDirective],
  imports: [CommonModule],
  exports: [ImngArrayGridDirective],
})
export class ImngKendoGridArrayModule { }

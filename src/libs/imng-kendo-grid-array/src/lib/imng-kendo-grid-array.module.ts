import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngArrayGridDirective } from './kendo-array-grid.directive';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [ImngArrayGridDirective],
  imports: [CommonModule, ImngKendoGridModule, GridModule],
  exports: [ImngArrayGridDirective],
})
export class ImngKendoGridArrayModule {}

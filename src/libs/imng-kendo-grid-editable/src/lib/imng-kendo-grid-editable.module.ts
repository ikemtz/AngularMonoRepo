import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMNG_KENDO_EDITABLE_GRID } from './editable-data-grid.directive';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [IMNG_KENDO_EDITABLE_GRID],
  imports: [CommonModule, GridModule],
  exports: [IMNG_KENDO_EDITABLE_GRID],
})
export class ImngKendoGridEditableModule {}

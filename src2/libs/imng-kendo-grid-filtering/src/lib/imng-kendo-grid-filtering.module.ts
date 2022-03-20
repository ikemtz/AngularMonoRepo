import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectFilterComponent } from './multi-select-filter/multi-select-filter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    MultiSelectFilterComponent
  ],
  exports: [MultiSelectFilterComponent]
})
export class ImngKendoGridFilteringModule { }

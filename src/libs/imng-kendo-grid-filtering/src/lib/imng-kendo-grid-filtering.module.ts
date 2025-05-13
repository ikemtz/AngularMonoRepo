import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectFilterComponent } from './multi-select-filter/multi-select-filter.component';
import { UuidFilterComponent } from './uuid-filter/uuid-filter.component';

@NgModule({
  imports: [CommonModule, UuidFilterComponent],
  declarations: [MultiSelectFilterComponent],
  exports: [MultiSelectFilterComponent, UuidFilterComponent],
})
export class ImngKendoGridFilteringModule {}

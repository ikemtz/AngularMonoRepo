import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiSelectFilterComponent } from './multi-select-filter/multi-select-filter.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { UuidFilterComponent } from './uuid-filter/uuid-filter.component';

@NgModule({
  imports: [CommonModule, GridModule],
  declarations: [
    MultiSelectFilterComponent,
    UuidFilterComponent
  ],
  exports: [MultiSelectFilterComponent, UuidFilterComponent]
})
export class ImngKendoGridFilteringModule { }

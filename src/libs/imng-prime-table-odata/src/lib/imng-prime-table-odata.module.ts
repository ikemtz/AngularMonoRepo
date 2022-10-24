import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngPrimeODataTableDirective } from './prime-odata-table.directive';
import { TableModule } from 'primeng/table';
import { SearchCaptionComponent } from './search-caption/search-caption.component';

@NgModule({
  imports: [CommonModule, TableModule],
  declarations: [
    ImngPrimeODataTableDirective,
    SearchCaptionComponent
  ],
  exports: [
    ImngPrimeODataTableDirective,
    SearchCaptionComponent
  ],
})
export class ImngPrimeTableODataModule { }

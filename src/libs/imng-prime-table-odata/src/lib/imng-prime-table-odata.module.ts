import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMNG_PRIME_TABLE } from './prime-odata-table.directive';
import { TableModule } from 'primeng/table';
import { IMNG_PRIME_SEARCH_CAPTION } from './search-caption/search-caption.component';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    IMNG_PRIME_TABLE,
    IMNG_PRIME_SEARCH_CAPTION,
  ],
  exports: [IMNG_PRIME_TABLE, IMNG_PRIME_SEARCH_CAPTION],
})
export class ImngPrimeTableODataModule {}

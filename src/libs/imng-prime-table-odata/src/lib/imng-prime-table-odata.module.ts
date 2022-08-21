import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImngPrimeODataTableDirective } from './prime-odata-table.directive';
import { TableModule } from 'primeng/table';

@NgModule({
  imports: [CommonModule, TableModule],
  declarations: [
    ImngPrimeODataTableDirective
  ],
  exports: [
    ImngPrimeODataTableDirective
  ],
})
export class ImngPrimeTableODataModule { }

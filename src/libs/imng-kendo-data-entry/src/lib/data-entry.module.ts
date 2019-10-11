import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DataEntryDialogComponent } from './data-entry-dialog/data-entry-dialog.component';

@NgModule({
  imports: [CommonModule, DialogModule],
  declarations: [DataEntryDialogComponent],
  exports: [DataEntryDialogComponent]
})
export class DataEntryDialogModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMNG_KENDO_DATA_ENTRY_DIALOG } from './data-entry-dialog.component';
import { IMNG_KENDO_DIALOG_BUTTONS } from './dialog-buttons.directive';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { IMNG_KENDO_DELETE_DIALOG } from './data-delete-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    IMNG_KENDO_DATA_ENTRY_DIALOG,
    IMNG_KENDO_DIALOG_BUTTONS,
    IMNG_KENDO_DELETE_DIALOG,
  ],
  exports: [
    IMNG_KENDO_DATA_ENTRY_DIALOG,
    IMNG_KENDO_DIALOG_BUTTONS,
    IMNG_KENDO_DELETE_DIALOG,
  ],
})
export class ImngDataEntryDialogModule {}

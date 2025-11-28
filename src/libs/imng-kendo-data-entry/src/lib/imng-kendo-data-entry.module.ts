import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEntryDialogComponent } from './data-entry-dialog.component';
import { DialogButtonsDirective } from './dialog-buttons.directive';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DataDeleteDialogComponent } from './data-delete-dialog.component';

@NgModule({
  imports: [CommonModule, DialogModule],
  declarations: [
    DataEntryDialogComponent,
    DialogButtonsDirective,
    DataDeleteDialogComponent,
  ],
  exports: [
    DataEntryDialogComponent,
    DialogButtonsDirective,
    DataDeleteDialogComponent,
  ],
})
export class ImngDataEntryDialogModule {}

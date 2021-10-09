import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEntryDialogComponent } from './data-entry-dialog.component';
import { DialogButtonsDirective } from './dialog-buttons.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [DataEntryDialogComponent, DialogButtonsDirective],
  exports: [DataEntryDialogComponent, DialogButtonsDirective],
  schemas: [NO_ERRORS_SCHEMA],
})
export class ImngDataEntryDialogModule {}

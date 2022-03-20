import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEntryDialogComponent } from './data-entry-dialog.component';
import { DialogButtonsDirective } from './dialog-buttons.directive';
import { DialogModule } from '@progress/kendo-angular-dialog';

@NgModule({
  imports: [CommonModule, DialogModule],
  declarations: [DataEntryDialogComponent, DialogButtonsDirective],
  exports: [DataEntryDialogComponent, DialogButtonsDirective],
})
export class ImngDataEntryDialogModule {}

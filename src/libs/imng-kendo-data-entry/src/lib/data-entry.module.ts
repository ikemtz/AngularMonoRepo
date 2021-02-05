import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DataEntryDialogComponent } from './data-entry-dialog.component';
import { DialogButtonsDirective } from './dialog-buttons.directive';

@NgModule({
  imports: [CommonModule, DialogModule],
  declarations: [DataEntryDialogComponent, DialogButtonsDirective],
  exports: [DataEntryDialogComponent, DialogButtonsDirective],
})
export class ImngDataEntryDialogModule { }

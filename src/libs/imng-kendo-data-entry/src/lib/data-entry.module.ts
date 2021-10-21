import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataEntryDialogComponent } from './data-entry-dialog.component';
import { DialogButtonsDirective } from './dialog-buttons.directive';
import {
  DialogContainerDirective,
  DialogContainerService,
  DialogService,
  DIALOG_DIRECTIVES,
  SharedModule,
} from '@progress/kendo-angular-dialog';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [DataEntryDialogComponent, DialogButtonsDirective, DIALOG_DIRECTIVES, DialogContainerDirective],
  exports: [DataEntryDialogComponent, DialogButtonsDirective],
  providers: [DialogContainerService, DialogService],
})
export class ImngDataEntryDialogModule {}

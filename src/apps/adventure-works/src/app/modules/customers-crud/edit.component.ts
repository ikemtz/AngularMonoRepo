import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  formGroupPatcher,
  ImngDataEntryDialogModule,
} from 'imng-kendo-data-entry';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DATEPICKER } from '@progress/kendo-angular-dateinputs';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';

import { CustomerBaseEntryComponent } from './base-entry.component';

@Component({
  selector: 'aw-customer-edit',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    KENDO_DROPDOWNS,
    KENDO_DATEPICKER,
    ImngDataEntryDialogModule,
  ],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerEditComponent
  extends CustomerBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Edit Customer';

  public override initForm(): void {
    super.initForm();
    this.allSubscriptions.push(
      this.facade.currentEntity$
        .pipe(formGroupPatcher(this.addEditForm))
        .subscribe(),
    );
  }

  public save(): void {
    const val = this.addEditForm.value;
    this.facade.updateExistingEntity(val);
  }
}

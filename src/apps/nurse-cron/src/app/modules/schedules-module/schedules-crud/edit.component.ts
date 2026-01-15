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
import { normalizeRequest } from 'imng-nrsrx-client-utils';
import { ISchedule } from '../../../models/schedules-odata';

import { ScheduleBaseEntryComponent } from './base-entry.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { KENDO_DATEPICKER } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'nrcrn-schedule-edit',
  imports: [
    AsyncPipe,
    CommonModule,
    ReactiveFormsModule,
    KENDO_DROPDOWNS,
    KENDO_DATEPICKER,
    ImngDataEntryDialogModule,
  ],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ScheduleEditComponent
  extends ScheduleBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Edit Schedule';
  public active$ = this.facade.isEditActive$;

  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(
        this.facade.currentEntity$
          .pipe(formGroupPatcher(this.addEditForm))
          .subscribe(),
      );
    }
  }

  public save(): void {
    const val = normalizeRequest<ISchedule>(this.addEditForm.value);
    this.facade.updateExistingEntity(val);
  }
}

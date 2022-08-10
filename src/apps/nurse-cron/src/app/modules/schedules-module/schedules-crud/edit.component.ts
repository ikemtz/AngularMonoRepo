import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { normalizeRequest } from 'imng-nrsrx-client-utils';
import { ISchedule } from '../../../models/schedules-odata';

import { ScheduleBaseEntryComponent } from './base-entry.component';
import { ScheduleCrudFacade } from './crud.facade';

@Component({
  selector: 'nrcrn-schedule-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScheduleEditComponent extends ScheduleBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Schedule';
  public active$ = this.facade.isEditActive$;

  constructor(facade: ScheduleCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
    }
  }

  public save(): void {
    const val = normalizeRequest<ISchedule>(this.addEditForm.value);
    this.facade.updateExistingEntity(val);
  }
}

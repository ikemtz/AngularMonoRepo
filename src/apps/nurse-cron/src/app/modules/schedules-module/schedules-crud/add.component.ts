import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { ScheduleBaseEntryComponent } from './base-entry.component';
import { ISchedule } from '../../../models/schedules-odata';

@Component({
    selector: 'nrcrn-schedule-add',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ScheduleAddComponent
  extends ScheduleBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Schedule';
  public active$ = this.facade.isNewActive$;

  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = normalizeRequest<ISchedule>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}

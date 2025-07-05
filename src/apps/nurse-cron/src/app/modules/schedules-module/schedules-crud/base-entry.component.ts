/* eslint-disable @angular-eslint/prefer-inject */
import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import {
  ScheduleProperties,
  ScheduleFormGroupFac,
  IScheduleForm,
} from '../../../models/schedules-odata';

import { ScheduleCrudFacade } from './crud.facade';

@Component({
  template: '',
  standalone: false,
})
export abstract class ScheduleBaseEntryComponent
  extends BaseDataEntryComponent<ScheduleCrudFacade>
  implements OnInit
{
  public readonly props = ScheduleProperties;
  public addEditForm: FormGroup<IScheduleForm>;

  constructor(facade: ScheduleCrudFacade) {
    super(facade);
  }
  public override ngOnInit(): void {
    super.ngOnInit();
  }

  public initForm(): void {
    this.addEditForm = ScheduleFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { EmployeeBaseEntryComponent } from './base-entry.component';
import { IEmployee } from '../../../models/employees-odata';

@Component({
  selector: 'nrcrn-employee-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAddComponent
  extends EmployeeBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Employee';
  public active$ = this.facade.isNewActive$;

  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = normalizeRequest<IEmployee>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { normalizeRequest } from 'imng-nrsrx-client-utils';
import { IEmployee } from '../../../models/employees-odata';

import { EmployeeBaseEntryComponent } from './base-entry.component';

@Component({
  selector: 'nrcrn-employee-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditComponent
  extends EmployeeBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Edit Employee';
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
    const val = normalizeRequest<IEmployee>(this.addEditForm.value);
    this.facade.updateExistingEntity(val);
  }
}

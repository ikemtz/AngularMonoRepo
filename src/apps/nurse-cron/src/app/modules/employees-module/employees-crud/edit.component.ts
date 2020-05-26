import { Component, ChangeDetectionStrategy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';

import { EmployeeBaseEntryComponent } from './base-entry.component';
import { EmployeeCrudFacade } from './crud.facade';
import { IEmployee } from '../../../models/employees-odata';

@Component({
  selector: 'nrcrn-employee-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditComponent extends EmployeeBaseEntryComponent {
  public dialogTitle = 'Edit Employee';
  public active$ = this.facade.isEditActive$;

  constructor(facade: EmployeeCrudFacade) {
    super(facade);
  }
  public initForm() {
    super.initForm();
    this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
  }
  public save() {
    if (this.addEditForm.valid) {
      const val: IEmployee = this.addEditForm.value;
      this.facade.updateExistingEntity(val);
    }
  }
}

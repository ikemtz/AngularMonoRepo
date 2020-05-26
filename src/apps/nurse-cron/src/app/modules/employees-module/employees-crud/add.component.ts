import { Component, ChangeDetectionStrategy } from '@angular/core';

import { EmployeeCrudFacade } from './crud.facade';
import { EmployeeBaseEntryComponent } from './base-entry.component';
import { IEmployee } from '../../../models/employees-odata';

@Component({
  selector: 'nrcrn-employee-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeAddComponent extends EmployeeBaseEntryComponent {
  public dialogTitle = 'Add Employee';
  public active$ = this.facade.isNewActive$;

  constructor(facade: EmployeeCrudFacade) {
    super(facade);
  }
  public initForm() {
    super.initForm();
    this.addEditForm.patchValue({});
  }
  public save() {
    if (this.addEditForm.valid) {
      const val: IEmployee = this.addEditForm.value;
      val.id = null;
      this.facade.saveNewEntity(val);
    }
  }
}

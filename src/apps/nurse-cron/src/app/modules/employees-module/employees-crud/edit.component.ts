import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';

import { EmployeeBaseEntryComponent } from './base-entry.component';
import { EmployeeCrudFacade } from './crud.facade';

@Component({
    selector: 'nrcrn-employee-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EmployeeEditComponent extends EmployeeBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Employee';
  public active$ = this.facade.isEditActive$;

  constructor(facade: EmployeeCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
    }
  }

  public save(): void {
    const val = this.addEditForm.value;
    this.facade.updateExistingEntity(val);
  }
}

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { EmployeeCrudFacade } from './crud.facade';
import { EmployeeBaseEntryComponent } from './base-entry.component';

@Component({
    selector: 'nrcrn-employee-add',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EmployeeAddComponent extends EmployeeBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Add Employee';
  public active$ = this.facade.isNewActive$;

  constructor(facade: EmployeeCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = this.addEditForm.value;
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}

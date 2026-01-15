import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { EmployeeBaseEntryComponent } from './base-entry.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { KENDO_DATEPICKER } from '@progress/kendo-angular-dateinputs';

@Component({
  selector: 'nrcrn-employee-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KENDO_DROPDOWNS,
    KENDO_DATEPICKER,
    ImngDataEntryDialogModule,
  ],
})
export class EmployeeAddComponent
  extends EmployeeBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Employee';

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

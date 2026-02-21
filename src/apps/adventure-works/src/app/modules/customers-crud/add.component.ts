import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';
import { AsyncPipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { CustomerBaseEntryComponent } from './base-entry.component';

@Component({
  selector: 'aw-customer-add',
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    KENDO_DROPDOWNS,
    ImngDataEntryDialogModule,
  ],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddComponent
  extends CustomerBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Customer';

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

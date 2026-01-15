import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { ProductBaseEntryComponent } from './base-entry.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DATEPICKER } from '@progress/kendo-angular-dateinputs';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';

@Component({
  selector: 'aw-product-add',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KENDO_DROPDOWNS,
    KENDO_DATEPICKER,
    ImngDataEntryDialogModule,
  ],
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent
  extends ProductBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Product';
  public active$ = this.facade.isNewActive$;

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

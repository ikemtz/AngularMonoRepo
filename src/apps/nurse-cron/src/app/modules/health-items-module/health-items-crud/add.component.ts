import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { HealthItemBaseEntryComponent } from './base-entry.component';
import { IHealthItem } from '../../../models/health-items-odata';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { KENDO_DROPDOWNS } from '@progress/kendo-angular-dropdowns';
import { ImngDataEntryDialogModule } from 'imng-kendo-data-entry';

@Component({
  selector: 'nrcrn-health-item-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    KENDO_DROPDOWNS,
    ImngDataEntryDialogModule,
  ],
})
export class HealthItemAddComponent
  extends HealthItemBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add HealthItem';
  public active$ = this.facade.isNewActive$;

  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = normalizeRequest<IHealthItem>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}

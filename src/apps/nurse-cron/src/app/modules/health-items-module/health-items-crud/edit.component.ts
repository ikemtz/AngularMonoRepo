import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { normalizeRequest } from 'imng-nrsrx-client-utils';
import { IHealthItem } from '../../../models/health-items-odata';

import { HealthItemBaseEntryComponent } from './base-entry.component';

@Component({
  selector: 'nrcrn-health-item-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthItemEditComponent
  extends HealthItemBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Edit HealthItem';
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
    const val = normalizeRequest<IHealthItem>(this.addEditForm.value);
    this.facade.updateExistingEntity(val);
  }
}

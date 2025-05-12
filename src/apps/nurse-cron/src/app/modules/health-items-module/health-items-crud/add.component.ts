import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { HealthItemBaseEntryComponent } from './base-entry.component';
import { IHealthItem } from '../../../models/health-items-odata';

@Component({
    selector: 'nrcrn-health-item-add',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
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

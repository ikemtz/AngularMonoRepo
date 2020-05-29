import { Component, ChangeDetectionStrategy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';

import { HealthItemBaseEntryComponent } from './base-entry.component';
import { HealthItemCrudFacade } from './crud.facade';
import { IHealthItem } from '../../../models/health-items-odata';

@Component({
  selector: 'nrcrn-health-item-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthItemEditComponent extends HealthItemBaseEntryComponent {
  public dialogTitle = 'Edit HealthItem';
  public active$ = this.facade.isEditActive$;

  constructor(facade: HealthItemCrudFacade) {
    super(facade);
  }
  public initForm() {
    super.initForm();
    this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
  }
  public save() {
    if (this.addEditForm.valid) {
      const val: IHealthItem = this.addEditForm.value;
      this.facade.updateExistingEntity(val);
    }
  }
}

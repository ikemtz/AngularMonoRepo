import { Component, ChangeDetectionStrategy } from '@angular/core';

import { HealthItemCrudFacade } from './crud.facade';
import { HealthItemBaseEntryDirective } from './base-entry.component';
import { IHealthItem } from '../../../models/health-items-odata';

@Component({
  selector: 'nrcrn-health-item-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthItemAddComponent extends HealthItemBaseEntryDirective {
  public dialogTitle = 'Add HealthItem';
  public active$ = this.facade.isNewActive$;

  constructor(facade: HealthItemCrudFacade) {
    super(facade);
  }
  public initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }
  public save(): void {
    if (this.addEditForm.valid) {
      const val: IHealthItem = this.addEditForm.value;
      val.id = null;
      this.facade.saveNewEntity(val);
    }
  }
}

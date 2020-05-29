import { Component, ChangeDetectionStrategy } from '@angular/core';

import { HealthItemCrudFacade } from './crud.facade';
import { HealthItemBaseEntryComponent } from './base-entry.component';

@Component({
  selector: 'nrcrn-health-item-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthItemAddComponent extends HealthItemBaseEntryComponent {
  public dialogTitle = 'Add HealthItem';
  public active$ = this.facade.isNewActive$;

  constructor(facade: HealthItemCrudFacade) {
    super(facade);
  }
  public initForm() {
    super.initForm();
    this.addEditForm.patchValue({});
  }
  public save() {
    if (this.addEditForm.valid) {
      const val: IHealthItem = this.addEditForm.value;
      val.id = null;
      this.facade.saveNewEntity(val);
    }
  }
}

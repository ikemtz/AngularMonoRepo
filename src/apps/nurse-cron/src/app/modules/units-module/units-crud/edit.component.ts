import { Component, ChangeDetectionStrategy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';

import { UnitBaseEntryComponent } from './base-entry.component';
import { UnitCrudFacade } from './crud.facade';
import { IUnit } from '../../../models/units-odata';

@Component({
  selector: 'nrcrn-unit-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitEditComponent extends UnitBaseEntryComponent {
  public dialogTitle = 'Edit Unit';
  public active$ = this.facade.isEditActive$;

  constructor(facade: UnitCrudFacade) {
    super(facade);
  }
  public initForm() {
    super.initForm();
    this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
  }
  public save() {
    if (this.addEditForm.valid) {
      const val: IUnit = this.addEditForm.value;
      this.facade.updateExistingEntity(val);
    }
  }
}

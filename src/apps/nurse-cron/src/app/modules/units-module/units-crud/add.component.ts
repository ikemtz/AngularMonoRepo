import { Component, ChangeDetectionStrategy } from '@angular/core';

import { UnitCrudFacade } from './crud.facade';
import { UnitBaseEntryDirective } from './base-entry.component';
import { IUnit } from '../../../models/units-odata';

@Component({
  selector: 'nrcrn-unit-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitAddComponent extends UnitBaseEntryDirective {
  public dialogTitle = 'Add Unit';
  public active$ = this.facade.isNewActive$;

  constructor(facade: UnitCrudFacade) {
    super(facade);
  }
  public initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }
  public save(): void {
    if (this.addEditForm.valid) {
      const val: IUnit = this.addEditForm.value;
      val.id = null;
      this.facade.saveNewEntity(val);
    }
  }
}

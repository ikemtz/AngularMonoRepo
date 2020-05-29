import { Component, ChangeDetectionStrategy } from '@angular/core';

import { BuildingCrudFacade } from './crud.facade';
import { BuildingBaseEntryComponent } from './base-entry.component';
import { IBuilding } from '../../../models/units-odata';

@Component({
  selector: 'nrcrn-building-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingAddComponent extends BuildingBaseEntryComponent {
  public dialogTitle = 'Add Building';
  public active$ = this.facade.isNewActive$;

  constructor(facade: BuildingCrudFacade) {
    super(facade);
  }
  public initForm() {
    super.initForm();
    this.addEditForm.patchValue({});
  }
  public save() {
    if (this.addEditForm.valid) {
      const val: IBuilding = this.addEditForm.value;
      val.id = null;
      this.facade.saveNewEntity(val);
    }
  }
}

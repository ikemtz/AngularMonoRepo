import { Component, ChangeDetectionStrategy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';

import { BuildingBaseEntryComponent } from './base-entry.component';
import { BuildingCrudFacade } from './crud.facade';
import { IBuilding } from '../../../models/units-odata';

@Component({
  selector: 'nrcrn-building-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingEditComponent extends BuildingBaseEntryComponent {
  public dialogTitle = 'Edit Building';
  public active$ = this.facade.isEditActive$;

  constructor(facade: BuildingCrudFacade) {
    super(facade);
  }
  public initForm(): void {
    super.initForm();
    this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
  }
  public save(): void {
    if (this.addEditForm.valid) {
      const val: IBuilding = this.addEditForm.value;
      this.facade.updateExistingEntity(val);
    }
  }
}

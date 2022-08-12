import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { normalizeRequest } from 'imng-nrsrx-client-utils';
import { IUnit } from '../../../models/units-odata';

import { UnitBaseEntryComponent } from './base-entry.component';
import { UnitCrudFacade } from './crud.facade';

@Component({
  selector: 'nrcrn-unit-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitEditComponent extends UnitBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Unit';
  public active$ = this.facade.isEditActive$;

  constructor(facade: UnitCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
    }
  }

  public save(): void {
    const val = normalizeRequest<IUnit>(this.addEditForm.value);
    this.facade.updateExistingEntity(val);
  }
}

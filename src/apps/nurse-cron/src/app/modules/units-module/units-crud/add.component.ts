import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { UnitCrudFacade } from './crud.facade';
import { UnitBaseEntryComponent } from './base-entry.component';
import { IUnit } from '../../../models/units-odata';

@Component({
  selector: 'nrcrn-unit-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitAddComponent extends UnitBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Add Unit';
  public active$ = this.facade.isNewActive$;

  constructor(facade: UnitCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = normalizeRequest<IUnit>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}

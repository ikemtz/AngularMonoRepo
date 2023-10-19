import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { BuildingBaseEntryComponent } from './base-entry.component';
import { IBuilding } from '../../../models/units-odata';

@Component({
  selector: 'nrcrn-building-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingAddComponent
  extends BuildingBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Building';
  public active$ = this.facade.isNewActive$;

  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = normalizeRequest<IBuilding>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}

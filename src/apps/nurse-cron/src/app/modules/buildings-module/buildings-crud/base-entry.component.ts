/* eslint-disable @angular-eslint/prefer-inject */
import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import {
  BuildingProperties,
  BuildingFormGroupFac,
  IBuildingForm,
} from '../../../models/units-odata';

import { BuildingCrudFacade } from './crud.facade';

@Component({
  template: '',
})
export abstract class BuildingBaseEntryComponent
  extends BaseDataEntryComponent<BuildingCrudFacade>
  implements OnInit
{
  public readonly props = BuildingProperties;
  public addEditForm: FormGroup<IBuildingForm>;

  constructor(facade: BuildingCrudFacade) {
    super(facade);
  }
  public override ngOnInit(): void {
    super.ngOnInit();
  }

  public initForm(): void {
    this.addEditForm = BuildingFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

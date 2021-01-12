import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { BuildingCrudFacade } from './crud.facade';
import { BuildingProperties, BuildingFormGroupFac } from '../../../models/units-odata';

@Component({ template: '' })
export abstract class BuildingBaseEntryComponent extends BaseDataEntryComponent<BuildingCrudFacade>
  implements OnInit {
  public readonly props = BuildingProperties;

  constructor(facade: BuildingCrudFacade) {
    super(facade);
  }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = BuildingFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

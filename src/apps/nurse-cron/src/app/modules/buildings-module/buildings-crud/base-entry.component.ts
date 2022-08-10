import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { BuildingProperties, BuildingFormGroupFac } from '../../../models/units-odata';

import { BuildingCrudFacade } from './crud.facade';

@Component({ template: '' })
export abstract class BuildingBaseEntryComponent extends BaseDataEntryComponent<BuildingCrudFacade>
  implements OnInit {
  public readonly props = BuildingProperties;

  constructor(facade: BuildingCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = BuildingFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

}

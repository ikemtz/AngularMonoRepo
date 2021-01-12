import { OnInit, Directive } from '@angular/core';
import { BaseDataEntryDirective } from 'imng-kendo-data-entry';

import { BuildingCrudFacade } from './crud.facade';
import { BuildingProperties, BuildingFormGroupFac } from '../../../models/units-odata';

@Directive()
export abstract class BuildingBaseEntryDirective extends BaseDataEntryDirective<BuildingCrudFacade>
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

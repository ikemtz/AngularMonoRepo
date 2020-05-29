import { OnInit } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { UnitCrudFacade } from './crud.facade';
import { IUnit, UnitProperties, UnitFormGroupFac } from '../../../models/units-odata';

export abstract class UnitBaseEntryComponent extends BaseDataEntryComponent<IUnit, UnitCrudFacade>
  implements OnInit {
  public readonly props = UnitProperties;

  constructor(facade: UnitCrudFacade) {
    super(facade);
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.addEditForm = UnitFormGroupFac();
  }

  public cancel() {
    this.facade.clearCurrentEntity();
  }
}

import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { UnitCrudFacade } from './crud.facade';
import { UnitProperties, UnitFormGroupFac } from '../../../models/units-odata';

@Component({ template: '' })
export abstract class UnitBaseEntryComponent extends BaseDataEntryComponent<UnitCrudFacade>
  implements OnInit {
  public readonly props = UnitProperties;

  constructor(facade: UnitCrudFacade) {
    super(facade);
  }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = UnitFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

import { OnInit, Directive } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { UnitCrudFacade } from './crud.facade';
import { IUnit, UnitProperties, UnitFormGroupFac } from '../../../models/units-odata';

@Directive()
export abstract class UnitBaseEntryDirective extends BaseDataEntryComponent<IUnit, UnitCrudFacade>
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

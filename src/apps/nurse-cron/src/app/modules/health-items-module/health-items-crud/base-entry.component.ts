import { OnInit, Directive } from '@angular/core';
import { BaseDataEntryDirective } from 'imng-kendo-data-entry';

import { HealthItemCrudFacade } from './crud.facade';
import { HealthItemProperties, HealthItemFormGroupFac } from '../../../models/health-items-odata';

@Directive()
export abstract class HealthItemBaseEntryDirective extends BaseDataEntryDirective<HealthItemCrudFacade>
  implements OnInit {
  public readonly props = HealthItemProperties;

  constructor(facade: HealthItemCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = HealthItemFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

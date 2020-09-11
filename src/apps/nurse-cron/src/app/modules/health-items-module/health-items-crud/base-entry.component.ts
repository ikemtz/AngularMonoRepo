import { OnInit, Directive } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { HealthItemCrudFacade } from './crud.facade';
import { IHealthItem, HealthItemProperties, HealthItemFormGroupFac } from '../../../models/health-items-odata';

@Directive()
export abstract class HealthItemBaseEntryComponent extends BaseDataEntryComponent<IHealthItem, HealthItemCrudFacade>
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

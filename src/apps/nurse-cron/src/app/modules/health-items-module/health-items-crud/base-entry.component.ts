import { OnInit } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { HealthItemCrudFacade } from './crud.facade';

export abstract class HealthItemBaseEntryComponent extends BaseDataEntryComponent<IHealthItem, HealthItemCrudFacade>
  implements OnInit {
  public readonly props = HealthItemProperties;

  constructor(facade: HealthItemCrudFacade) {
    super(facade);
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.addEditForm = HealthItemFormGroupFac();
  }

  public cancel() {
    this.facade.clearCurrentEntity();
  }
}

/* eslint-disable @angular-eslint/prefer-inject */
import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import {
  HealthItemProperties,
  HealthItemFormGroupFac,
  IHealthItemForm,
} from '../../../models/health-items-odata';

import { HealthItemCrudFacade } from './crud.facade';

@Component({
  template: '',
  standalone: false,
})
export abstract class HealthItemBaseEntryComponent
  extends BaseDataEntryComponent<HealthItemCrudFacade>
  implements OnInit
{
  public readonly props = HealthItemProperties;
  public addEditForm: FormGroup<IHealthItemForm>;

  constructor(facade: HealthItemCrudFacade) {
    super(facade);
  }

  public override ngOnInit(): void {
    super.ngOnInit();
  }

  public initForm(): void {
    this.addEditForm = HealthItemFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

import { OnInit, Directive } from '@angular/core';
import { CustomerProperties, CustomerFormGroupFac } from '../../../models';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { CustomerCrudFacade } from './crud.facade';


@Directive()
export abstract class CustomerBaseEntryComponent extends BaseDataEntryComponent<CustomerCrudFacade>
  implements OnInit {
  public readonly props = CustomerProperties;

  constructor(facade: CustomerCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = CustomerFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

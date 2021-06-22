import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { SaleOrderCrudFacade } from './crud.facade';
import { SaleOrderFormGroupFac, SaleOrderProperties } from '../../../models';

@Component({ template: '' })
export abstract class SaleOrderBaseEntryComponent extends BaseDataEntryComponent<SaleOrderCrudFacade>
  implements OnInit {
  public readonly props = SaleOrderProperties;

  constructor(facade: SaleOrderCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = SaleOrderFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

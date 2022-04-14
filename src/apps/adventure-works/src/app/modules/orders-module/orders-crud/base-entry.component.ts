import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { OrderFormGroupFac, OrderProperties } from '../../../models/webapi';

import { OrderCrudFacade } from './crud.facade';

@Component({ template: '' })
export abstract class OrderBaseEntryComponent extends BaseDataEntryComponent<OrderCrudFacade>
  implements OnInit {
  public readonly props = OrderProperties;

  constructor(facade: OrderCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = OrderFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

import { OnInit, Component } from '@angular/core';
import { ProductFormGroupFac, ProductProperties } from '../../../models';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { ProductCrudFacade } from './crud.facade';

@Component({ template: '' })
export abstract class ProductBaseEntryComponent extends BaseDataEntryComponent<ProductCrudFacade>
  implements OnInit {
  public readonly props = ProductProperties;

  constructor(facade: ProductCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = ProductFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { ProductCrudFacade } from './crud.facade';
import { ProductBaseEntryComponent } from './base-entry.component';
import { IProduct } from '../../../models/webapi';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

@Component({
  selector: 'aw-product-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductAddComponent
  extends ProductBaseEntryComponent
  implements OnInit, OnDestroy {
  public dialogTitle = 'Add Product';
  public active$ = this.facade.isNewActive$;

  constructor(facade: ProductCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = normalizeRequest<IProduct>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}

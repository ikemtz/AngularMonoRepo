import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { IProduct } from '../../../models/webapi';

import { ProductBaseEntryComponent } from './base-entry.component';
import { ProductCrudFacade } from './crud.facade';

@Component({
  selector: 'aw-product-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent extends ProductBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Product';
  public active$ = this.facade.isEditActive$;

  constructor(facade: ProductCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
    }
  }

  public save(): void {
    if (this.addEditForm.valid) {
      const val: IProduct = this.addEditForm.value;
      this.facade.updateExistingEntity(val);
    }
  }
}

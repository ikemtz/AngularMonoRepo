import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';

import { SaleOrderBaseEntryComponent } from './base-entry.component';
import { SaleOrderCrudFacade } from './crud.facade';
import { ISaleOrder } from '../../../models';

@Component({
  selector: 'aw-sale-order-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleOrderEditComponent extends SaleOrderBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Edit SaleOrder';
  public active$ = this.facade.isEditActive$;

  constructor(facade: SaleOrderCrudFacade) {
    super(facade);
  }
  public initForm(): void {
    super.initForm();
    this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
  }

  public save(): void {
    if (this.addEditForm.valid) {
      const val: ISaleOrder = this.addEditForm.value;
      this.facade.updateExistingEntity(val);
    }
  }
}

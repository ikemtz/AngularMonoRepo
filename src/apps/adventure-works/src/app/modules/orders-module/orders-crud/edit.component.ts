import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { IOrder } from '../../../models/webapi';

import { OrderBaseEntryComponent } from './base-entry.component';
import { OrderCrudFacade } from './crud.facade';

@Component({
  selector: 'aw-order-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderEditComponent extends OrderBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Order';
  public active$ = this.facade.isEditActive$;

  constructor(facade: OrderCrudFacade) {
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
      const val: IOrder = this.addEditForm.value;
      this.facade.updateExistingEntity(val);
    }
  }
}
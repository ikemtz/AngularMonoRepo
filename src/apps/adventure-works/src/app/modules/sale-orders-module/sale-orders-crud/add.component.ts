import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { SaleOrderCrudFacade } from './crud.facade';
import { SaleOrderBaseEntryComponent } from './base-entry.component';
import { ISaleOrder } from '../../../models';

@Component({
  selector: 'aw-sale-order-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SaleOrderAddComponent extends SaleOrderBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Add SaleOrder';
  public active$ = this.facade.isNewActive$;

  constructor(facade: SaleOrderCrudFacade) {
    super(facade);
  }
  public initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    if (this.addEditForm.valid) {
      const val: ISaleOrder = this.addEditForm.value;
      val.id = undefined;
      this.facade.saveNewEntity(val);
    }
  }
}

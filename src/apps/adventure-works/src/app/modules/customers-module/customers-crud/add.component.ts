import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { ICustomer } from '../../../models';
import { CustomerCrudFacade } from './crud.facade';
import { CustomerBaseEntryComponent } from './base-entry.component';

@Component({
  selector: 'aw-customer-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerAddComponent extends CustomerBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Add Customer';
  public active$ = this.facade.isNewActive$;

  constructor(facade: CustomerCrudFacade) {
    super(facade);
  }
  public initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    if (this.addEditForm.valid) {
      const val: ICustomer = this.addEditForm.value;
      val.id = undefined;
      this.facade.saveNewEntity(val);
    }
  }
}

import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { ICustomer } from '../../../models/webapi';

import { CustomerBaseEntryComponent } from './base-entry.component';
import { CustomerCrudFacade } from './crud.facade';

@Component({
  selector: 'aw-customer-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerEditComponent extends CustomerBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Customer';
  public active$ = this.facade.isEditActive$;

  constructor(facade: CustomerCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
    }
  }

  public save(): void {
    if (this.addEditForm?.valid) {
      const val: ICustomer = this.addEditForm?.value;
      this.facade.updateExistingEntity(val);
    }
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { OrderCrudFacade } from './crud.facade';
import { OrderBaseEntryComponent } from './base-entry.component';

@Component({
  selector: 'aw-order-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderAddComponent
  extends OrderBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Order';
  public active$ = this.facade.isNewActive$;

  constructor(facade: OrderCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = this.addEditForm.value;
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}

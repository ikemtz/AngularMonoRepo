import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';

import { ProductBaseEntryComponent } from './base-entry.component';

@Component({
    selector: 'aw-product-add',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProductAddComponent
  extends ProductBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Product';
  public active$ = this.facade.isNewActive$;

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

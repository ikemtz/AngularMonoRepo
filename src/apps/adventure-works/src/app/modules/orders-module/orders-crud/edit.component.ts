import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';

import { OrderBaseEntryComponent } from './base-entry.component';

@Component({
    selector: 'aw-order-edit',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class OrderEditComponent
  extends OrderBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Edit Order';
  public active$ = this.facade.isEditActive$;

  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(
        this.facade.currentEntity$
          .pipe(formGroupPatcher(this.addEditForm))
          .subscribe(),
      );
    }
  }

  public save(): void {
    const val = this.addEditForm.value;
    this.facade.updateExistingEntity(val);
  }
}

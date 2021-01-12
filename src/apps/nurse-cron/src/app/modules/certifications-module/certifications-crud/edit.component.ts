import { Component, ChangeDetectionStrategy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';

import { CertificationBaseEntryDirective } from './base-entry.component';
import { CertificationCrudFacade } from './crud.facade';
import { ICertification } from '../../../models/certifications-odata';

@Component({
  selector: 'nrcrn-certification-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationEditComponent extends CertificationBaseEntryDirective {
  public dialogTitle = 'Edit Certification';
  public active$ = this.facade.isEditActive$;

  constructor(facade: CertificationCrudFacade) {
    super(facade);
  }
  public initForm(): void {
    super.initForm();
    this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
  }
  public save(): void {
    if (this.addEditForm.valid) {
      const val: ICertification = this.addEditForm.value;
      this.facade.updateExistingEntity(val);
    }
  }
}

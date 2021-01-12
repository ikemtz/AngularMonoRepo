import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CertificationCrudFacade } from './crud.facade';
import { CertificationBaseEntryComponent } from './base-entry.component';
import { ICertification } from '../../../models/certifications-odata';

@Component({
  selector: 'nrcrn-certification-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationAddComponent extends CertificationBaseEntryComponent {
  public dialogTitle = 'Add Certification';
  public active$ = this.facade.isNewActive$;

  constructor(facade: CertificationCrudFacade) {
    super(facade);
  }
  public initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }
  public save(): void {
    if (this.addEditForm.valid) {
      const val: ICertification = this.addEditForm.value;
      val.id = null;
      this.facade.saveNewEntity(val);
    }
  }
}

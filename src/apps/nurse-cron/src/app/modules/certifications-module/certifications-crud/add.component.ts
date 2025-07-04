import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { CertificationBaseEntryComponent } from './base-entry.component';
import { ICertification } from '../../../models/certifications-odata';

@Component({
    selector: 'nrcrn-certification-add',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CertificationAddComponent
  extends CertificationBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Certification';
  public active$ = this.facade.isNewActive$;

  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = normalizeRequest<ICertification>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}

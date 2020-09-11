import { OnInit, Directive } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { CertificationCrudFacade } from './crud.facade';
import { ICertification, CertificationProperties, CertificationFormGroupFac } from '../../../models/certifications-odata';

@Directive()
export abstract class CertificationBaseEntryComponent extends BaseDataEntryComponent<ICertification, CertificationCrudFacade>
  implements OnInit {
  public readonly props = CertificationProperties;

  constructor(facade: CertificationCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = CertificationFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

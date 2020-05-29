import { OnInit } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { CertificationCrudFacade } from './crud.facade';
import { ICertification, CertificationProperties, CertificationFormGroupFac } from '../../../models/certifications-odata';

export abstract class CertificationBaseEntryComponent extends BaseDataEntryComponent<ICertification, CertificationCrudFacade>
  implements OnInit {
  public readonly props = CertificationProperties;

  constructor(facade: CertificationCrudFacade) {
    super(facade);
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.addEditForm = CertificationFormGroupFac();
  }

  public cancel() {
    this.facade.clearCurrentEntity();
  }
}

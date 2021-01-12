import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { CertificationCrudFacade } from './crud.facade';
import { CertificationProperties, CertificationFormGroupFac } from '../../../models/certifications-odata';

@Component({ template: '' })
export abstract class CertificationBaseEntryComponent
  extends BaseDataEntryComponent<CertificationCrudFacade>
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

import { OnInit, Directive } from '@angular/core';
import { BaseDataEntryDirective } from 'imng-kendo-data-entry';

import { CertificationCrudFacade } from './crud.facade';
import { CertificationProperties, CertificationFormGroupFac } from '../../../models/certifications-odata';

@Directive()
export abstract class CertificationBaseEntryDirective
  extends BaseDataEntryDirective<CertificationCrudFacade>
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

import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import {
  CertificationProperties,
  CertificationFormGroupFac,
  ICertificationForm,
} from '../../../models/certifications-odata';

import { CertificationCrudFacade } from './crud.facade';

@Component({ template: '' })
export abstract class CertificationBaseEntryComponent
  extends BaseDataEntryComponent<CertificationCrudFacade>
  implements OnInit
{
  public readonly props = CertificationProperties;
  public addEditForm: FormGroup<ICertificationForm>;

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

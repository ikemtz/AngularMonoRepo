import { OnInit } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import {
  EmployeeCertificationFormGroupFac,
  IEmployeeCertification,
  EmployeeCertificationProperties,
} from '../../models/emp-api';
import { NurseCertificationDataEntryFacade } from './nurse-certification-data-entry-facade';
import { Observable, of } from 'rxjs';
import { ICertification } from '../../models/cert-api-models';

export abstract class BaseNurseCertificationComponent
  extends BaseDataEntryComponent<IEmployeeCertification, NurseCertificationDataEntryFacade>
  implements OnInit {
  public props = EmployeeCertificationProperties;
  public certifications$: Observable<Array<ICertification>>;

  constructor(facade: NurseCertificationDataEntryFacade) {
    super(facade);
    this.certifications$ = of([{ id: '7', name: '7 Step' }]);
  }
  ngOnInit(): void {}

  public initForm() {
    this.addEditForm = EmployeeCertificationFormGroupFac();
  }
}

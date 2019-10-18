import { Component, OnInit } from '@angular/core';
import { IEmployeeCertification } from '../../models/emp-api';
import { NurseCertificationDataEntryFacade } from './nurse-certification-data-entry-facade';
import { BaseNurseCertificationComponent } from './base-nurse-certification.component';

@Component({
  selector: 'ngnu-add-nurse-certification',
  templateUrl: './add-edit-nurse-certification.component.html',
  styleUrls: ['./add-edit-nurse-certification.component.scss'],
})
export class AddNurseCertificationComponent extends BaseNurseCertificationComponent implements OnInit {
  public dialogTitle = 'Add Nurse Certification';

  constructor(facade: NurseCertificationDataEntryFacade) {
    super(facade);
  }
  public save() {
    const val: IEmployeeCertification = this.addEditForm.value;
    this.facade.saveNewEntity(val);
  }
}

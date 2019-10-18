import { Component, OnInit } from '@angular/core';
import { IEmployeeCertification } from '../../models/emp-api';
import { NurseCertificationDataEntryFacade } from './nurse-certification-data-entry-facade';
import { take, tap } from 'rxjs/operators';
import { BaseNurseCertificationComponent } from './base-nurse-certification.component';

@Component({
  selector: 'ngnu-edit-certification-nurses',
  templateUrl: './add-edit-nurse-certification.component.html',
  styleUrls: ['./add-edit-nurse-certification.component.scss'],
})
export class EditNurseCertificationComponent extends BaseNurseCertificationComponent implements OnInit {
  public dialogTitle = 'Edit Nurse';

  constructor(facade: NurseCertificationDataEntryFacade) {
    super(facade);
  }
  public save() {
    const val: IEmployeeCertification = this.addEditForm.value;
    this.facade.updateExistingEntity(val);
  }
  public ngOnInit() {
    super.ngOnInit();
    this.allSubscriptions.push(
      this.facade.currentEntity$
        .pipe(
          take(1),
          tap(t => {
            this.addEditForm.patchValue(t);
          }),
        )
        .subscribe(),
    );
  }
}

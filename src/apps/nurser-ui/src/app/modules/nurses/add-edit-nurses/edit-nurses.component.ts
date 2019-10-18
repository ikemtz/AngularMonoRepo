import { Component, OnInit } from '@angular/core';
import { IEmployee, EmployeeInsertRequestFormGroupFac } from '../../models/emp-api';
import { NursesDataEntryFacade } from './nurses-data-entry-facade';
import { BaseNursesComponent } from './base-nurses.component';
import { take, tap } from 'rxjs/operators';

@Component({
  selector: 'ngnu-edit-nurses',
  templateUrl: './add-edit-nurse.component.html',
  styleUrls: ['./add-edit-nurse.component.scss'],
})
export class EditNursesComponent extends BaseNursesComponent implements OnInit {
  public dialogTitle = 'Edit Nurse';

  constructor(facade: NursesDataEntryFacade) {
    super(facade);
  }
  public save() {
    const val: IEmployee = this.addEditForm.value;
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

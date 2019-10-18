import { Component, OnInit } from '@angular/core';
import { IEmployee, EmployeeInsertRequestFormGroupFac } from '../../models/emp-api';
import { NursesDataEntryFacade } from './nurses-data-entry-facade';
import { BaseNursesComponent } from './base-nurses.component';

@Component({
  selector: 'ngnu-add-nurses',
  templateUrl: './add-edit-nurse.component.html',
  styleUrls: ['./add-edit-nurse.component.scss'],
})
export class AddNursesComponent extends BaseNursesComponent implements OnInit {
  public dialogTitle = 'Add New Nurse';

  constructor(facade: NursesDataEntryFacade) {
    super(facade);
  }
  public save() {
    const val: IEmployee = this.addEditForm.value;
    this.facade.saveNewEntity(val);
  }
}

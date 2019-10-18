import { Component, OnInit } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { IEmployee, EmployeeProperties, EmployeeInsertRequestFormGroupFac } from '../../models/emp-api';
import { NursesDataEntryFacade } from './nurses-data-entry-facade';

@Component({
  selector: 'ngnu-add-nurses',
  templateUrl: './add-edit-nurse.component.html',
  styleUrls: ['./add-edit-nurse.component.scss'],
})
export class AddNursesComponent extends BaseDataEntryComponent<IEmployee, NursesDataEntryFacade> implements OnInit {
  public dialogTitle = 'Add New Nurse';
  public props = EmployeeProperties;

  constructor(facade: NursesDataEntryFacade) {
    super(facade);
  }
  public initForm() {
    this.addEditForm = EmployeeInsertRequestFormGroupFac();
  }
  public save() {
    const val: IEmployee = this.addEditForm.value;
    this.facade.saveNewEntity(val);
  }
  ngOnInit() {}
}

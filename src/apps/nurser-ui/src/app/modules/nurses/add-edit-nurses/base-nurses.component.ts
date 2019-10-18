import { OnInit } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { IEmployee, EmployeeProperties, EmployeeInsertRequestFormGroupFac } from '../../models/emp-api';
import { NursesDataEntryFacade } from './nurses-data-entry-facade';

export abstract class BaseNursesComponent extends BaseDataEntryComponent<IEmployee, NursesDataEntryFacade>
  implements OnInit {
  public props = EmployeeProperties;

  constructor(facade: NursesDataEntryFacade) {
    super(facade);
  }
  ngOnInit(): void {}

  public initForm() {
    this.addEditForm = EmployeeInsertRequestFormGroupFac();
  }
}

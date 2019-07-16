import { Component } from '@angular/core';
import { EmployeesFacade } from '../+state/employees.facade';  
import { EmployeesPartialState } from '../+state/employees.reducer';
import { IEmployee, EmployeeProperties } from '../../models/emp-odata';
import {KendoODataComponentBase} from '@imko/kendo-grid-odata';
@Component({
  selector: 'ngnu-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent extends KendoODataComponentBase<IEmployee, EmployeesPartialState, EmployeesFacade> {
  constructor(fascade: EmployeesFacade) {
    super(fascade, {
      take: 20,
      skip: 0,
      expanders: ['certifications'],
      selectors: [
        EmployeeProperties.ID,
        EmployeeProperties.LAST_NAME,
        EmployeeProperties.FIRST_NAME,
        EmployeeProperties.EMAIL,
        EmployeeProperties.MOBILE_PHONE
      ],
      sort: [{ field: EmployeeProperties.LAST_NAME, dir: 'asc' }, { field: EmployeeProperties.FIRST_NAME, dir: 'asc' }]
    });
  }

  public addHandler() {
    this.facade.addNewEntity();
  }
}

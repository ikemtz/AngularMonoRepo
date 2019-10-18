import { Component, OnInit } from '@angular/core';
import { EmployeeProperties, IEmployee } from '../../models/emp-api';
import { ListFacade } from './list.facade';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { NursesDataEntryFacade } from '../add-edit-nurses/nurses-data-entry-facade';

@Component({
  selector: 'ngnu-nurses-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class NursesComponent extends KendoODataComponentBase<IEmployee, ListFacade> {
  props = EmployeeProperties;
  constructor(readonly fascade: ListFacade, public readonly nursesDataEntryFacade: NursesDataEntryFacade) {
    super(fascade, {
      take: 20,
      skip: 0,
      expanders: ['certifications'],
      selectors: [
        EmployeeProperties.ID,
        EmployeeProperties.LAST_NAME,
        EmployeeProperties.FIRST_NAME,
        EmployeeProperties.EMAIL,
        EmployeeProperties.MOBILE_PHONE,
      ],
      sort: [{ field: EmployeeProperties.LAST_NAME, dir: 'asc' }, { field: EmployeeProperties.FIRST_NAME, dir: 'asc' }],
    });
  }

  public addHandler() {
    this.facade.addNewEntity();
  }
}

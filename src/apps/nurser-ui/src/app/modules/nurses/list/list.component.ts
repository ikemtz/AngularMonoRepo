import { Component, OnInit } from '@angular/core';
import { EmployeeProperties, IEmployee } from '../../models/emp-api';
import { ListFacade } from './list.facade';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { NursesDataEntryFacade } from '../add-edit-nurses/nurses-data-entry-facade';
import { NurseCertificationDataEntryFacade } from '../add-edit-nurse-certification/nurse-certification-data-entry-facade';

@Component({
  selector: 'ngnu-nurses-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends KendoODataComponentBase<IEmployee, ListFacade> implements OnInit {
  props = EmployeeProperties;
  constructor(
    readonly fascade: ListFacade,
    public readonly nursesDataEntryFacade: NursesDataEntryFacade,
    public readonly nurseCertificationsDataEntryFacade: NurseCertificationDataEntryFacade,
  ) {
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

  public addNurse() {
    this.facade.addNewNurse();
  }
  public editNurse(item: IEmployee) {
    this.facade.editNurse(item);
  }
  public deleteNurse(item: IEmployee) {
    this.facade.deleteNurse(item);
  }
}

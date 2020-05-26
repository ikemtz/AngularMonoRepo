import { OnInit, OnDestroy } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { EmployeeCrudFacade } from './crud.facade';
import { IEmployee, EmployeeProperties, EmployeeFormGroupFac } from '../../../models/employees-odata';

export abstract class EmployeeBaseEntryComponent extends BaseDataEntryComponent<IEmployee, EmployeeCrudFacade>
  implements OnInit {
  public readonly props = EmployeeProperties;

  constructor(facade: EmployeeCrudFacade) {
    super(facade);
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.addEditForm = EmployeeFormGroupFac();
  }

  public cancel() {
    this.facade.clearCurrentEntity();
  }
}

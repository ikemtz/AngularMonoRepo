import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { EmployeeProperties, EmployeeFormGroupFac } from '../../../models/employees-odata';

import { EmployeeCrudFacade } from './crud.facade';

@Component({ template: '' })
export abstract class EmployeeBaseEntryComponent extends BaseDataEntryComponent<EmployeeCrudFacade>
  implements OnInit {
  public readonly props = EmployeeProperties;

  constructor(facade: EmployeeCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = EmployeeFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

}

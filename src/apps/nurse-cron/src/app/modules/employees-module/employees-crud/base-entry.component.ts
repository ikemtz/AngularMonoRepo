import { OnInit, Directive } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { EmployeeCrudFacade } from './crud.facade';
import { IEmployee, EmployeeProperties, EmployeeFormGroupFac } from '../../../models/employees-odata';

@Directive()
export abstract class EmployeeBaseEntryComponent extends BaseDataEntryComponent<IEmployee, EmployeeCrudFacade>
  implements OnInit {
  public readonly props = EmployeeProperties;

  constructor(facade: EmployeeCrudFacade) {
    super(facade);
  }

  ngOnInit() {
    this.initForm();
    this.addEditForm.patchValue({
      [EmployeeProperties.CERTIFICATION_COUNT]: 0,
      [EmployeeProperties.COMPETENCY_COUNT]: 0,
      [EmployeeProperties.HEALTH_ITEM_COUNT]: 0,
      [EmployeeProperties.IS_ENABLED]: true,
      [EmployeeProperties.HIRE_DATE]: new Date()
    });
  }

  public initForm() {
    this.addEditForm = EmployeeFormGroupFac();
  }

  public cancel() {
    this.facade.clearCurrentEntity();
  }
}

import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { EmployeeCrudFacade } from './crud.facade';
import { EmployeeProperties, EmployeeFormGroupFac } from '../../../models/employees-odata';

@Component({ template: '' })
export abstract class EmployeeBaseEntryComponent extends BaseDataEntryComponent<EmployeeCrudFacade>
  implements OnInit {
  public readonly props = EmployeeProperties;

  constructor(facade: EmployeeCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
    this.addEditForm.patchValue({
      [EmployeeProperties.CERTIFICATION_COUNT]: 0,
      [EmployeeProperties.COMPETENCY_COUNT]: 0,
      [EmployeeProperties.HEALTH_ITEM_COUNT]: 0,
      [EmployeeProperties.IS_ENABLED]: true,
      [EmployeeProperties.HIRE_DATE]: new Date()
    });
  }

  public initForm(): void {
    this.addEditForm = EmployeeFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

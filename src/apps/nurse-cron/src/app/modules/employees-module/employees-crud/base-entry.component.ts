/* eslint-disable @angular-eslint/prefer-inject */
import { OnInit, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { EmployeeCrudFacade } from './crud.facade';
import {
  EmployeeProperties,
  IEmployeeForm,
  EmployeeFormGroupFac,
} from '../../../models/employees-api';

@Component({
  template: '',
})
export abstract class EmployeeBaseEntryComponent
  extends BaseDataEntryComponent<EmployeeCrudFacade>
  implements OnInit
{
  public readonly props = EmployeeProperties;
  public addEditForm: FormGroup<IEmployeeForm>;

  constructor() {
    super(inject(EmployeeCrudFacade));
  }

  public override ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = EmployeeFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}

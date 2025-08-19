import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { environment } from '@env';

import { IEmployee, EmployeeProperties } from '../../../models/employees-api';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService extends NrsrxBaseApiClientService<IEmployee> {
  public override url = environment.webApiEndpoints.employees;

  public override dateOnlyPropertyNames = [
    EmployeeProperties.BIRTH_DATE,
    EmployeeProperties.HIRE_DATE,
    EmployeeProperties.FIRE_DATE];

}

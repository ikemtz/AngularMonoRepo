import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { IEmployee } from '../../../models/employees-odata';

@Injectable({
  providedIn: 'root',
})
export class EmployeeApiService extends NrsrxBaseApiClientService<IEmployee> {
  public url = environment.endPoints.employees.employeessApi;
  constructor(http: HttpClient) {
    super(http);
  }
}

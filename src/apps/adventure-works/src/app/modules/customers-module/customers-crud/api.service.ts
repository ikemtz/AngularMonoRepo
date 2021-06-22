import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../../../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService extends NrsrxBaseApiClientService<ICustomer> {
  public url = environment.endPoints.customers;
  constructor(http: HttpClient) {
    super(http);
  }
}

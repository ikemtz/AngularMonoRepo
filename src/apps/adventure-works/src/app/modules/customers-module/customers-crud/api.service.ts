import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { ICustomer } from '../../../models/odata';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService extends NrsrxBaseApiClientService<ICustomer> {
  public override url = environment.webApiEnpoints.customers;
  constructor(http: HttpClient) {
    super(http);
  }
}

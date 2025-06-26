import { Injectable, inject } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ICustomer } from '../../../models/webapi';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService extends NrsrxBaseApiClientService<ICustomer> {
  public override url = environment.webApiEnpoints.customers;
  constructor() {
    const http = inject(HttpClient);

    super(http);
  }
}

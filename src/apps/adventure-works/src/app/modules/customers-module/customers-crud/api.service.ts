import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { environment } from '../../../../environments/environment';
import { ICustomer } from '../../../models/webapi';

@Injectable({
  providedIn: 'root',
})
export class CustomerApiService extends NrsrxBaseApiClientService<ICustomer> {
  public override url = environment.webApiEnpoints.customers;
}

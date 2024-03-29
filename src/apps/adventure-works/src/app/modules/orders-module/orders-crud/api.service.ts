import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IOrder } from '../../../models/odata';

@Injectable({
  providedIn: 'root',
})
export class OrderApiService extends NrsrxBaseApiClientService<IOrder> {
  public override url = environment.webApiEnpoints.orders;
  constructor(http: HttpClient) {
    super(http);
  }
}

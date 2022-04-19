import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IOrderLineItem } from '../../../models/webapi';

@Injectable({
  providedIn: 'root',
})
export class OrderLineItemApiService extends NrsrxBaseApiClientService<IOrderLineItem> {
  public override url = environment.webApiEnpoints.orders;
  constructor(http: HttpClient) {
    super(http);
  }
}

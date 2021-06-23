import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { ISaleOrder } from '../../../models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleOrderApiService extends NrsrxBaseApiClientService<ISaleOrder> {
  public url = environment.endPoints.sale_orders;
  constructor(http: HttpClient) {
    super(http);
  }
}

import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { ISaleOrder } from '../../../models';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/adventure-works/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SaleOrderApiService extends NrsrxBaseApiClientService<ISaleOrder> {
  public url = environment.endPoints.sale_orders;
  constructor(http: HttpClient) {
    super(http);
  }
}

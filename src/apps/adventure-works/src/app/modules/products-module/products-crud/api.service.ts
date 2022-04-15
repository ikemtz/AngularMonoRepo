import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IProduct } from '../../../models/webapi';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService extends NrsrxBaseApiClientService<IProduct> {
  public override url = environment.webApiEnpoints.products;
  constructor(http: HttpClient) {
    super(http);
  }
}

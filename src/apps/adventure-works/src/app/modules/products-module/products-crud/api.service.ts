import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../../../models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService extends NrsrxBaseApiClientService<IProduct> {
  public url = environment.endPoints.products;
  constructor(http: HttpClient) {
    super(http);
  }
}

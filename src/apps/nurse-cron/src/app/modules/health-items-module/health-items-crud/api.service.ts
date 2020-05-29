import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';

@Injectable({
  providedIn: 'root',
})
export class HealthItemApiService extends NrsrxBaseApiClientService<IHealthItem> {
  public url = environment.endPoints.healthItems.healthItemsApi;
  constructor(http: HttpClient) {
    super(http);
  }
}

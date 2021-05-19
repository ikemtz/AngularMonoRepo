import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/nurse-cron';
import { IHealthItem } from '../../../models/health-items-odata';

@Injectable({
  providedIn: 'root',
})
export class HealthItemApiService extends NrsrxBaseApiClientService<IHealthItem> {
  public url = environment.endPoints.healthItems.healthItemsApi;
  constructor(http: HttpClient) {
    super(http);
  }
}

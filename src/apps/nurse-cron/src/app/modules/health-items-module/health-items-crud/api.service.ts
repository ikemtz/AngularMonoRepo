import { Injectable, inject } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IHealthItem } from '../../../models/health-items-odata';

@Injectable({
  providedIn: 'root',
})
export class HealthItemApiService extends NrsrxBaseApiClientService<IHealthItem> {
  public override url = environment.endPoints.healthItems.healthItemsApi;
  constructor() {
    const http = inject(HttpClient);

    super(http);
  }
}

import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { environment } from '../../../../environments/environment';
import { IHealthItem } from '../../../models/health-items-odata';

@Injectable({
  providedIn: 'root',
})
export class HealthItemApiService extends NrsrxBaseApiClientService<IHealthItem> {
  public override url = environment.endPoints.healthItems.healthItemsApi;
}

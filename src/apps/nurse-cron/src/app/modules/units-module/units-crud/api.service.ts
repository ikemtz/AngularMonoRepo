import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env-nurse-cron';
import { IUnit } from '../../../models/units-odata';

@Injectable({
  providedIn: 'root',
})
export class UnitApiService extends NrsrxBaseApiClientService<IUnit> {
  public url = environment.endPoints.units.unitsApi;
  constructor(http: HttpClient) {
    super(http);
  }
}

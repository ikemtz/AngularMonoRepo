import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ISchedule } from '../../../models/schedules-odata';

@Injectable({
  providedIn: 'root',
})
export class ScheduleApiService extends NrsrxBaseApiClientService<ISchedule> {
  public override url = environment.endPoints.schedules.schedulesApi;
  constructor(http: HttpClient) {
    super(http);
  }
}

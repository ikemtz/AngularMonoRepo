import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CompetencyApiService extends NrsrxBaseApiClientService<ICompetency> {
  public override url = environment.webApiEnpoints.competencies;
  constructor(http: HttpClient) {
    super(http);
  }
}

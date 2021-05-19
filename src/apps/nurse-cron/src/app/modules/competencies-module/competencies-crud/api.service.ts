import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env-nurse-cron';
import { ICompetency } from '../../../models/competencies-odata';

@Injectable({
  providedIn: 'root',
})
export class CompetencyApiService extends NrsrxBaseApiClientService<ICompetency> {
  public url = environment.endPoints.competencies.competenciesApi;
  constructor(http: HttpClient) {
    super(http);
  }
}

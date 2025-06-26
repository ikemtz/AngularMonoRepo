import { Injectable, inject } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ICompetency } from '../../../models/competencies-odata';

@Injectable({
  providedIn: 'root',
})
export class CompetencyApiService extends NrsrxBaseApiClientService<ICompetency> {
  public override url = environment.endPoints.competencies.competenciesApi;
  constructor() {
    const http = inject(HttpClient);

    super(http);
  }
}

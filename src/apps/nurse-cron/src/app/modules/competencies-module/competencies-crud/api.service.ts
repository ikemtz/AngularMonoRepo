import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { environment } from '../../../../environments/environment';
import { ICompetency } from '../../../models/competencies-odata';

@Injectable({
  providedIn: 'root',
})
export class CompetencyApiService extends NrsrxBaseApiClientService<ICompetency> {
  public override url = environment.endPoints.competencies.competenciesApi;
}

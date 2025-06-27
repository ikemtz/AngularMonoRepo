import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { environment } from '../../../../environments/environment';
import { ICertification } from '../../../models/certifications-odata';

@Injectable({
  providedIn: 'root',
})
export class CertificationApiService extends NrsrxBaseApiClientService<ICertification> {
  public override url = environment.endPoints.certifications.certificationsApi;
}

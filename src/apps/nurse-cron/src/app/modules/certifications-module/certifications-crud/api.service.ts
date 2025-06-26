import { Injectable, inject } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ICertification } from '../../../models/certifications-odata';

@Injectable({
  providedIn: 'root',
})
export class CertificationApiService extends NrsrxBaseApiClientService<ICertification> {
  public override url = environment.endPoints.certifications.certificationsApi;
  constructor() {
    const http = inject(HttpClient);

    super(http);
  }
}

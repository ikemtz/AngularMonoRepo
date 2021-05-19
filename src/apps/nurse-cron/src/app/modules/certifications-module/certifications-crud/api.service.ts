import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env-nurse-cron';
import { ICertification } from '../../../models/certifications-odata';

@Injectable({
  providedIn: 'root',
})
export class CertificationApiService extends NrsrxBaseApiClientService<ICertification> {
  public url = environment.endPoints.certifications.certificationsApi;
  constructor(http: HttpClient) {
    super(http);
  }
}

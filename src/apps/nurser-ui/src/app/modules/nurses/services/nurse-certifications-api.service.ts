import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { IEmployeeCertification } from '../../models/emp-api';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/nurser-ui/src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NurseCertificationsApiService extends NrsrxBaseApiClientService<IEmployeeCertification> {
  url: string = environment.endPoints.emplMs.CertsApiEndpoint;
  constructor(http: HttpClient) {
    super(http);
  }
}

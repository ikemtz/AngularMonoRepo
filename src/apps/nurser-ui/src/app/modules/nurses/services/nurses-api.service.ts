import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/nurser-ui/src/environments/environment';
import { IEmployee } from '../../models/emp-api';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';

@Injectable({
  providedIn: 'root',
})
export class NursesApiService extends NrsrxBaseApiClientService<IEmployee> {
  url: string = environment.endPoints.emplMs.ApiEndpoint;
  constructor(http: HttpClient) {
    super(http);
  }
}

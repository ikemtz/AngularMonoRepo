import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { environment } from '../../../../environments/environment';
import { IBuilding } from '../../../models/units-odata';

@Injectable({
  providedIn: 'root',
})
export class BuildingApiService extends NrsrxBaseApiClientService<IBuilding> {
  public override url = environment.endPoints.buildings.buildingsApi;
}

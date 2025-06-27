import { Injectable } from '@angular/core';
import { NrsrxBaseApiClientService } from 'imng-nrsrx-client-utils';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { IUnit } from '../../../models/units-odata';

@Injectable({
  providedIn: 'root',
})
export class UnitApiService extends NrsrxBaseApiClientService<IUnit> {
  public override url = environment.endPoints.units.unitsApi;
}

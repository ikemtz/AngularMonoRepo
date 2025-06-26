import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { unitsFeature } from '../+state/unit.reducer';
import * as unitActionTypes from '../+state/unit.actions';
import { IUnit } from '../../../models/units-odata';

@Injectable()
export class UnitListFacade implements IKendoODataGridFacade<IUnit>, IDataDeleteFacade<IUnit> {
  private readonly store = inject(Store);

  loading$ = this.store.select(unitsFeature.selectLoading);
  gridData$ = this.store.select(unitsFeature.selectGridData);
  gridPagerSettings$ = this.store.select(unitsFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(unitsFeature.selectGridODataState);

  public loadEntities(state: ODataState): void {
    this.store.dispatch(unitActionTypes.loadUnitsRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(unitActionTypes.reloadUnitsRequest());
  }

  public deleteExistingEntity(entity: IUnit): void {
    this.store.dispatch(unitActionTypes.deleteUnitRequest(entity));
  }
}

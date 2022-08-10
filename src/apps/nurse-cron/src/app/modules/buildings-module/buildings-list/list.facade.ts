import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { buildingsFeature } from '../+state/building.reducer';
import * as buildingActionTypes from '../+state/building.actions';
import { IBuilding } from '../../../models/units-odata';

@Injectable()
export class BuildingListFacade implements IKendoODataGridFacade<IBuilding>, IDataDeleteFacade<IBuilding> {
  loading$ = this.store.select(buildingsFeature.selectLoading);
  gridData$ = this.store.select(buildingsFeature.selectGridData);
  gridPagerSettings$ = this.store.select(buildingsFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(buildingsFeature.selectGridODataState);

  constructor(private readonly store: Store) { }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(buildingActionTypes.loadBuildingsRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(buildingActionTypes.reloadBuildingsRequest());
  }

  public deleteExistingEntity(entity: IBuilding): void {
    this.store.dispatch(buildingActionTypes.deleteBuildingRequest(entity));
  }
}

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { BuildingsPartialState } from '../+state/building.reducer';
import { buildingQueries } from '../+state/building.selectors';
import * as buildingActionTypes from '../+state/building.actions';
import { IBuilding } from '../../../models/units-odata';

@Injectable()
export class BuildingListFacade implements IKendoODataGridFacade<IBuilding>, IDataDeleteFacade<IBuilding> {
  loading$ = this.store.pipe(select(buildingQueries.getLoading));
  gridODataState$ = this.store.pipe(select(buildingQueries.getGridODataState));
  gridData$ = this.store.pipe(select(buildingQueries.getBuildings));
  gridPagerSettings$ = this.store.pipe(select(buildingQueries.getPagerSettings));

  constructor(private readonly store: Store<BuildingsPartialState>) {}
  reloadEntities(): void {
    this.store.dispatch(buildingActionTypes.reloadBuildingsRequest());
  }
  public loadEntities(state: ODataState): void {
    this.store.dispatch(buildingActionTypes.loadBuildingsRequest(state));
  }

  public deleteExistingEntity(entity: IBuilding): void {
    this.store.dispatch(buildingActionTypes.deleteBuildingRequest(entity));
  }
}

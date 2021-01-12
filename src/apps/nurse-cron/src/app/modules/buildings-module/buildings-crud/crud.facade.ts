import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { BuildingsPartialState } from '../+state/building.reducer';
import { buildingQueries } from '../+state/building.selectors';
import * as buildingActionTypes from '../+state/building.actions';
import { IBuilding } from '../../../models/units-odata';

@Injectable()
export class BuildingCrudFacade implements IDataEntryFacade<IBuilding> {
  loading$ = this.store.pipe(select(buildingQueries.getLoading));
  currentEntity$ = this.store.pipe(select(buildingQueries.getCurrentBuilding));
  isEditActive$ = this.store.pipe(select(buildingQueries.getIsEditBuildingActive));
  isNewActive$ = this.store.pipe(select(buildingQueries.getIsNewBuildingActive));

  constructor(private readonly store: Store<BuildingsPartialState>) { }
  setCurrentEntity(item: IBuilding): void {
    this.store.dispatch(buildingActionTypes.setCurrentBuilding(item));
  }
  clearCurrentEntity(): void {
    this.store.dispatch(buildingActionTypes.clearCurrentBuilding());
  }
  saveNewEntity(item: IBuilding): void {
    this.store.dispatch(buildingActionTypes.saveBuildingRequest(item));
  }
  updateExistingEntity(item: IBuilding): void {
    this.store.dispatch(buildingActionTypes.updateBuildingRequest(item));
  }
}

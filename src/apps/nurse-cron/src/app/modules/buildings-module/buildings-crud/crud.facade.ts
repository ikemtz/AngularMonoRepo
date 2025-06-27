import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { buildingsFeature } from '../+state/building.reducer';
import { buildingQueries } from '../+state/building.selectors';
import * as buildingActionTypes from '../+state/building.actions';
import { IBuilding } from '../../../models/units-odata';

@Injectable()
export class BuildingCrudFacade implements IDataEntryFacade<IBuilding> {
  private readonly store = inject(Store);

  loading$ = this.store.select(buildingsFeature.selectLoading);
  currentEntity$ = this.store.select(buildingQueries.selectCurrentBuilding);
  isEditActive$ = this.store.select(buildingQueries.selectIsEditBuildingActive);
  isNewActive$ = this.store.select(buildingQueries.selectIsNewBuildingActive);

  public setCurrentEntity(item: IBuilding): void {
    this.store.dispatch(buildingActionTypes.setCurrentBuilding(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(buildingActionTypes.clearCurrentBuilding());
  }

  public saveNewEntity(item: IBuilding): void {
    this.store.dispatch(buildingActionTypes.saveBuildingRequest(item));
  }

  public updateExistingEntity(item: IBuilding): void {
    this.store.dispatch(buildingActionTypes.updateBuildingRequest(item));
  }

}

import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { ODataState } from 'imng-kendo-odata';
import { unitsFeature } from '../+state/unit.reducer';
import { unitQueries } from '../+state/unit.selectors';
import * as unitActionTypes from '../+state/unit.actions';
import { IUnit } from '../../../models/units-odata';

@Injectable()
export class UnitCrudFacade implements IDataEntryFacade<IUnit> {
  loading$ = this.store.select(unitsFeature.selectLoading);
  currentEntity$ = this.store.select(unitQueries.selectCurrentUnit);
  isEditActive$ = this.store.select(unitQueries.selectIsEditUnitActive);
  isNewActive$ = this.store.select(unitQueries.selectIsNewUnitActive);
  buildings$ = this.store.select(unitsFeature.selectBuildings);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: IUnit): void {
    this.store.dispatch(unitActionTypes.setCurrentUnit(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(unitActionTypes.clearCurrentUnit());
  }

  public saveNewEntity(item: IUnit): void {
    this.store.dispatch(unitActionTypes.saveUnitRequest(item));
  }

  public updateExistingEntity(item: IUnit): void {
    this.store.dispatch(unitActionTypes.updateUnitRequest(item));
  }

  public loadBuildings(state: ODataState): void {
    this.store.dispatch(unitActionTypes.loadBuildingsRequest(state));
  }
}

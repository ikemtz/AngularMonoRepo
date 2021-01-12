import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { UnitsPartialState } from '../+state/unit.reducer';
import { unitQueries } from '../+state/unit.selectors';
import * as unitActionTypes from '../+state/unit.actions';
import { IUnit } from '../../../models/units-odata';

@Injectable()
export class UnitCrudFacade implements IDataEntryFacade<IUnit> {
  loading$ = this.store.pipe(select(unitQueries.getLoading));
  currentEntity$ = this.store.pipe(select(unitQueries.getCurrentUnit));
  isEditActive$ = this.store.pipe(select(unitQueries.getIsEditUnitActive));
  isNewActive$ = this.store.pipe(select(unitQueries.getIsNewUnitActive));

  constructor(private readonly store: Store<UnitsPartialState>) { }
  setCurrentEntity(item: IUnit): void {
    this.store.dispatch(unitActionTypes.setCurrentUnit(item));
  }
  clearCurrentEntity(): void {
    this.store.dispatch(unitActionTypes.clearCurrentUnit());
  }
  saveNewEntity(item: IUnit): void {
    this.store.dispatch(unitActionTypes.saveUnitRequest(item));
  }
  updateExistingEntity(item: IUnit): void {
    this.store.dispatch(unitActionTypes.updateUnitRequest(item));
  }
}

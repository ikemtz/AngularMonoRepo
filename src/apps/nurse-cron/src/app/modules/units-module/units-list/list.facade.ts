import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { UnitsPartialState } from '../+state/unit.reducer';
import { unitQueries } from '../+state/unit.selectors';
import * as unitActionTypes from '../+state/unit.actions';
import { IUnit } from '../../../models/units-odata';

@Injectable()
export class UnitListFacade implements IKendoODataGridFacade<IUnit>, IDataDeleteFacade<IUnit> {
  loading$ = this.store.pipe(select(unitQueries.getLoading));
  gridODataState$ = this.store.pipe(select(unitQueries.getGridODataState));
  gridData$ = this.store.pipe(select(unitQueries.getUnits));
  gridPagerSettings$ = this.store.pipe(select(unitQueries.getPagerSettings));

  constructor(private readonly store: Store<UnitsPartialState>) { }

  loadEntities(state: ODataState) {
    this.store.dispatch(unitActionTypes.loadUnitsRequest(state));
  }

  deleteExistingEntity(entity: IUnit): void {
    this.store.dispatch(unitActionTypes.deleteUnitRequest(entity));
  }
}

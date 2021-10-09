import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { HealthItemsPartialState } from '../+state/health-item.reducer';
import { healthItemQueries } from '../+state/health-item.selectors';
import * as healthItemActionTypes from '../+state/health-item.actions';
import { IHealthItem } from '../../../models/health-items-odata';

@Injectable()
export class HealthItemListFacade implements IKendoODataGridFacade<IHealthItem>, IDataDeleteFacade<IHealthItem> {
  loading$ = this.store.pipe(select(healthItemQueries.getLoading));
  gridODataState$ = this.store.pipe(select(healthItemQueries.getGridODataState));
  gridData$ = this.store.pipe(select(healthItemQueries.getHealthItems));
  gridPagerSettings$ = this.store.pipe(select(healthItemQueries.getPagerSettings));

  constructor(private readonly store: Store<HealthItemsPartialState>) {}
  reloadEntities(): void {
    throw new Error('Method not implemented.');
  }

  loadEntities(state: ODataState): void {
    this.store.dispatch(healthItemActionTypes.loadHealthItemsRequest(state));
  }

  deleteExistingEntity(entity: IHealthItem): void {
    this.store.dispatch(healthItemActionTypes.deleteHealthItemRequest(entity));
  }
}

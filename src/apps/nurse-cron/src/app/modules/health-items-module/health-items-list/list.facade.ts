import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { healthItemsFeature } from '../+state/health-item.reducer';
import * as healthItemActionTypes from '../+state/health-item.actions';
import { IHealthItem } from '../../../models/health-items-odata';

@Injectable()
export class HealthItemListFacade implements IKendoODataGridFacade<IHealthItem>, IDataDeleteFacade<IHealthItem> {
  private readonly store = inject(Store);

  loading$ = this.store.select(healthItemsFeature.selectLoading);
  gridData$ = this.store.select(healthItemsFeature.selectGridData);
  gridPagerSettings$ = this.store.select(healthItemsFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(healthItemsFeature.selectGridODataState);

  public loadEntities(state: ODataState): void {
    this.store.dispatch(healthItemActionTypes.loadHealthItemsRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(healthItemActionTypes.reloadHealthItemsRequest());
  }

  public deleteExistingEntity(entity: IHealthItem): void {
    this.store.dispatch(healthItemActionTypes.deleteHealthItemRequest(entity));
  }
}

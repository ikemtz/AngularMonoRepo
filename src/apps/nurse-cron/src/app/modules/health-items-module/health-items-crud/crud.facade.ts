import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ODataState } from 'imng-kendo-odata';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { HealthItemsPartialState } from '../+state/health-item.reducer';
import { healthItemQueries } from '../+state/health-item.selectors';
import * as healthItemActionTypes from '../+state/health-item.actions';

@Injectable()
export class HealthItemCrudFacade implements IDataEntryFacade<IHealthItem> {
  loading$ = this.store.pipe(select(healthItemQueries.getLoading));
  currentEntity$ = this.store.pipe(select(healthItemQueries.getCurrentHealthItem));
  isEditActive$ = this.store.pipe(select(healthItemQueries.getIsEditHealthItemActive));
  isNewActive$ = this.store.pipe(select(healthItemQueries.getIsNewHealthItemActive));

  constructor(private readonly store: Store<HealthItemsPartialState>) {}
  loadEntities(state: ODataState): void {}
  setCurrentEntity(item: IHealthItem): void {
    this.store.dispatch(healthItemActionTypes.setCurrentHealthItem(item));
  }
  clearCurrentEntity(): void {
    this.store.dispatch(healthItemActionTypes.clearCurrentHealthItem());
  }
  saveNewEntity(item: IHealthItem): void {
    this.store.dispatch(healthItemActionTypes.saveHealthItemRequest(item));
  }
  updateExistingEntity(item: IHealthItem): void {
    this.store.dispatch(healthItemActionTypes.updateHealthItemRequest(item));
  }
}

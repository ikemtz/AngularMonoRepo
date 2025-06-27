import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { healthItemsFeature } from '../+state/health-item.reducer';
import { healthItemQueries } from '../+state/health-item.selectors';
import * as healthItemActionTypes from '../+state/health-item.actions';
import { IHealthItem } from '../../../models/health-items-odata';

@Injectable()
export class HealthItemCrudFacade implements IDataEntryFacade<IHealthItem> {
  private readonly store = inject(Store);

  loading$ = this.store.select(healthItemsFeature.selectLoading);
  currentEntity$ = this.store.select(healthItemQueries.selectCurrentHealthItem);
  isEditActive$ = this.store.select(healthItemQueries.selectIsEditHealthItemActive);
  isNewActive$ = this.store.select(healthItemQueries.selectIsNewHealthItemActive);

  public setCurrentEntity(item: IHealthItem): void {
    this.store.dispatch(healthItemActionTypes.setCurrentHealthItem(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(healthItemActionTypes.clearCurrentHealthItem());
  }

  public saveNewEntity(item: IHealthItem): void {
    this.store.dispatch(healthItemActionTypes.saveHealthItemRequest(item));
  }

  public updateExistingEntity(item: IHealthItem): void {
    this.store.dispatch(healthItemActionTypes.updateHealthItemRequest(item));
  }

}

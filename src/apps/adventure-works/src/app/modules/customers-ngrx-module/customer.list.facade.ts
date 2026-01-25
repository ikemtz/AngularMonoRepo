import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { customersFeature, customerActionTypes } from './+state';
import { ICustomer } from '../../models/webapi';

@Injectable({ providedIn: 'root' })
export class CustomerListFacade implements IKendoODataGridFacade<ICustomer> {
  private readonly store = inject(Store);

  loading$ = this.store.select(customersFeature.selectLoading);
  gridData$ = this.store.select(customersFeature.selectGridData);
  gridPagerSettings$ = this.store.select(
    customersFeature.selectGridPagerSettings,
  );
  gridODataState$ = this.store.select(customersFeature.selectGridODataState);

  public loadEntities(state: ODataState): void {
    this.store.dispatch(customerActionTypes.loadCustomersRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(customerActionTypes.reloadCustomersRequest());
  }
}

import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { customersFeature } from '../+state/customer.reducer';
import * as customerActionTypes from '../+state/customer.actions';
import { ICustomer } from '../../../models/odata';

@Injectable()
export class CustomerListFacade implements IKendoODataGridFacade<ICustomer>, IDataDeleteFacade<ICustomer> {
  private readonly store = inject(Store);

  loading$ = this.store.select(customersFeature.selectLoading);
  gridData$ = this.store.select(customersFeature.selectGridData);
  gridPagerSettings$ = this.store.select(customersFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(customersFeature.selectGridODataState);

  public loadEntities(state: ODataState): void {
    this.store.dispatch(customerActionTypes.loadCustomersRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(customerActionTypes.reloadCustomersRequest());
  }

  public deleteExistingEntity(entity: ICustomer): void {
    this.store.dispatch(customerActionTypes.deleteCustomerRequest(entity));
  }
}

import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { customersFeature, CustomersPartialState } from '../+state/customer.reducer';
import * as customerActionTypes from '../+state/customer.actions';
import { ICustomer } from '../../../models/odata';

@Injectable()
export class CustomerListFacade implements IKendoODataGridFacade<ICustomer>, IDataDeleteFacade<ICustomer> {
  loading$ = this.store.pipe(select(customersFeature.selectLoading));
  gridData$ = this.store.pipe(select(customersFeature.selectGridData));
  gridPagerSettings$ = this.store.pipe(select(customersFeature.selectGridPagerSettings));
  gridODataState$ = this.store.pipe(select(customersFeature.selectGridODataState));

  constructor(private readonly store: Store<CustomersPartialState>) { }

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

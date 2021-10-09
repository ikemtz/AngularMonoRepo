import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { CustomersPartialState } from '../+state/customer.reducer';
import { customerQueries } from '../+state/customer.selectors';
import * as customersActionTypes from '../+state/customer.actions';
import { ICustomer } from '../../../models';

@Injectable()
export class CustomerListFacade implements IKendoODataGridFacade<ICustomer>, IDataDeleteFacade<ICustomer> {
  loading$ = this.store.pipe(select(customerQueries.getLoading));
  gridData$ = this.store.pipe(select(customerQueries.getCustomers));
  gridPagerSettings$ = this.store.pipe(select(customerQueries.getPagerSettings));
  gridODataState$ = this.store.pipe(select(customerQueries.getGridODataState));

  constructor(private readonly store: Store<CustomersPartialState>) {}
  reloadEntities(): void {
    throw new Error('Method not implemented.');
  }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(customersActionTypes.loadCustomersRequest(state));
  }

  public deleteExistingEntity(entity: ICustomer): void {
    this.store.dispatch(customersActionTypes.deleteCustomerRequest(entity));
  }
}

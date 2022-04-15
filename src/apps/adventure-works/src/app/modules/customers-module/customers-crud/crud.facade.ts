import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { customersFeature } from '../+state/customer.reducer';
import { customerQueries } from '../+state/customer.selectors';
import * as customerActionTypes from '../+state/customer.actions';
import { ICustomer } from '../../../models/webapi';

@Injectable()
export class CustomerCrudFacade implements IDataEntryFacade<ICustomer> {
  loading$ = this.store.select(customersFeature.selectLoading);
  currentEntity$ = this.store.select(customerQueries.selectCurrentCustomer);
  isEditActive$ = this.store.select(customerQueries.selectIsEditCustomerActive);
  isNewActive$ = this.store.select(customerQueries.selectIsNewCustomerActive);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: ICustomer): void {
    this.store.dispatch(customerActionTypes.setCurrentCustomer(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(customerActionTypes.clearCurrentCustomer());
  }

  public saveNewEntity(item: ICustomer): void {
    this.store.dispatch(customerActionTypes.saveCustomerRequest(item));
  }

  public updateExistingEntity(item: ICustomer): void {
    this.store.dispatch(customerActionTypes.updateCustomerRequest(item));
  }
}

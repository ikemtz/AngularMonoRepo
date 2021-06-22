import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ODataState } from 'imng-kendo-odata';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { CustomersPartialState } from '../+state/customer.reducer';
import { customerQueries } from '../+state/customer.selectors';
import * as customerActionTypes from '../+state/customer.actions';
import { ICustomer } from '../../../models';

@Injectable()
export class CustomerCrudFacade implements IDataEntryFacade<ICustomer> {
  loading$ = this.store.pipe(select(customerQueries.getLoading));
  currentEntity$ = this.store.pipe(select(customerQueries.getCurrentCustomer));
  isEditActive$ = this.store.pipe(select(customerQueries.getIsEditCustomerActive));
  isNewActive$ = this.store.pipe(select(customerQueries.getIsNewCustomerActive));

  constructor(private readonly store: Store<CustomersPartialState>) { }
  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public loadEntities(state: ODataState): void { }

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

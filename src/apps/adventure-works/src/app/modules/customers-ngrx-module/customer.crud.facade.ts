import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade, IDataEntryFacade } from 'imng-kendo-data-entry';

import { customersFeature, customerActionTypes } from './+state';
import { ICustomer } from '../../models/webapi';

@Injectable({ providedIn: 'root' })
export class CustomerCrudFacade
  implements IDataEntryFacade<ICustomer>, IDataDeleteFacade<ICustomer>
{
  private readonly store = inject(Store);

  loading$ = this.store.select(customersFeature.selectLoading);
  currentEntity$ = this.store.select(customersFeature.selectCurrentCustomer);
  currentModalState$ = this.store.select(
    customersFeature.selectCurrentCustomerModalState,
  );

  public setCurrentEntity(item: ICustomer, modalState: string): void {
    this.store.dispatch(
      customerActionTypes.setCurrentCustomer({
        modalState,
        entity: item,
      }),
    );
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

  public deleteExistingEntity(item: ICustomer): void {
    this.store.dispatch(customerActionTypes.deleteCustomerRequest(item));
  }
}

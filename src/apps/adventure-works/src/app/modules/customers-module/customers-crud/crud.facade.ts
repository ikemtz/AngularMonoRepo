import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade, ModalStates } from 'imng-kendo-data-entry';
import { ODataState } from 'imng-kendo-odata';
import { customersFeature } from '../+state/customer.reducer';
import * as customerActionTypes from '../+state/customer.actions';
import { ICustomer } from '../../../models/webapi';
import { map } from 'rxjs';

@Injectable()
export class CustomerCrudFacade implements IDataEntryFacade<ICustomer> {
  private readonly store = inject(Store);

  loading$ = this.store.select(customersFeature.selectLoading);
  currentModalState$ = this.store.select(
    customersFeature.selectCurrentModalState,
  );
  currentEntity$ = this.store.select(customersFeature.selectCurrentCustomer);
  isEditActive$ = this.currentModalState$.pipe(
    map((modalState) => modalState === ModalStates.EDIT),
  );
  isNewActive$ = this.currentModalState$.pipe(
    map((modalState) => modalState === ModalStates.ADD),
  );
  salesAgents$ = this.store.select(customersFeature.selectSalesAgents);

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

  public loadSalesAgents(state: ODataState): void {
    this.store.dispatch(customerActionTypes.loadSalesAgentsRequest(state));
  }
}

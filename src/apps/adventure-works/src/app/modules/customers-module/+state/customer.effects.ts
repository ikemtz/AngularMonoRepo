import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';

import * as fromCustomersReducer from './customer.reducer';
import * as customerActionTypes from './customer.actions';

import { CustomerApiService } from '../customers-crud';
import { ICustomer } from '../../../models';
import { environment } from '../../../environments/environment';

@Injectable()
export class CustomerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly dataPersistence: DataPersistence<fromCustomersReducer.CustomersPartialState>,
    private readonly customerApiService: CustomerApiService,
  ) { }

  loadCustomersEffect$ = createEffect(() =>
    this.dataPersistence.fetch(customerActionTypes.loadCustomersRequest, {
      run: (action: ReturnType<typeof customerActionTypes.loadCustomersRequest>) =>
        this.odataservice
          .fetch<ICustomer>(environment.endPoints.customers, action.payload)
          .pipe(
            map(t => customerActionTypes.loadCustomersSuccess(t)),
          ),
      onError: this.exceptionHandler,
    })
  );

  saveCustomerEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(customerActionTypes.saveCustomerRequest, {
      run: (action: ReturnType<typeof customerActionTypes.saveCustomerRequest>, partialState: fromCustomersReducer.CustomersPartialState) =>
        this.customerApiService.post(action.payload).pipe(
          map(() => customerActionTypes.loadCustomersRequest(partialState[fromCustomersReducer.CUSTOMERS_FEATURE_KEY].gridODataState))),
      onError: this.exceptionHandler,
    })
  );

  updateCustomerEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(customerActionTypes.updateCustomerRequest, {
      run: (action: ReturnType<typeof customerActionTypes.updateCustomerRequest>, partialState: fromCustomersReducer.CustomersPartialState) =>
        this.customerApiService.put(action.payload).pipe(
          map(() => customerActionTypes.loadCustomersRequest(partialState[fromCustomersReducer.CUSTOMERS_FEATURE_KEY].gridODataState))),
      onError: this.exceptionHandler,
    })
  );

  deleteCustomerEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(customerActionTypes.deleteCustomerRequest, {
      run: (action: ReturnType<typeof customerActionTypes.deleteCustomerRequest>, partialState: fromCustomersReducer.CustomersPartialState) =>
        this.customerApiService.delete(action.payload).pipe(
          map(() => customerActionTypes.loadCustomersRequest(partialState[fromCustomersReducer.CUSTOMERS_FEATURE_KEY].gridODataState))),
      onError: this.exceptionHandler,
    })
  );

  private exceptionHandler(_action: unknown, error: unknown) {
    console.error('Error', error); // NOSONAR
    return customerActionTypes.customersFailure({ error });
  }
}

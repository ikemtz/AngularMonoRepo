import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { customersFeature } from './customer.reducer';
import * as customerActionTypes from './customer.actions';
import { environment } from '../../../../environments/environment';

import { CustomerApiService } from '../customers-crud';
import { ICustomer, ISalesAgent } from '../../../models/odata';

@Injectable()
export class CustomerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store: Store,
    private readonly customerApiService: CustomerApiService,
  ) { }

  loadCustomersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.loadCustomersRequest),
      switchMap((action: ReturnType<typeof customerActionTypes.loadCustomersRequest>) => this.odataservice
        .fetch<ICustomer>(environment.odataEnpoints.customers, action.payload)
        .pipe(
          map(t => customerActionTypes.loadCustomersSuccess(t)),
          handleEffectError(action))));
  });

  reloadCustomersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.reloadCustomersRequest),
      concatLatestFrom(() => this.store.select(customersFeature.selectGridODataState)),
      switchMap(([action, odataState]) => this.odataservice
        .fetch<ICustomer>(environment.odataEnpoints.customers, odataState, { bustCache: true })
        .pipe(
          map(t => customerActionTypes.reloadCustomersSuccess(t)),
          handleEffectError(action))));
  });

  saveCustomerEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.saveCustomerRequest),
      switchMap((action: ReturnType<typeof customerActionTypes.saveCustomerRequest>) => this.customerApiService.post(action.payload).pipe(
        map(() => customerActionTypes.reloadCustomersRequest()),
        handleEffectError(action))));
  });

  updateCustomerEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.updateCustomerRequest),
      switchMap((action: ReturnType<typeof customerActionTypes.updateCustomerRequest>) => this.customerApiService.put(action.payload).pipe(
        map(() => customerActionTypes.reloadCustomersRequest()),
        handleEffectError(action))));
  });

  deleteCustomerEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.deleteCustomerRequest),
      switchMap((action: ReturnType<typeof customerActionTypes.deleteCustomerRequest>) => this.customerApiService.delete(action.payload).pipe(
        map(() => customerActionTypes.reloadCustomersRequest()),
        handleEffectError(action))));
  });

  loadSalesAgentsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.loadSalesAgentsRequest),
      switchMap((action: ReturnType<typeof customerActionTypes.loadSalesAgentsRequest>) => this.odataservice
        .fetch<ISalesAgent>(environment.odataEnpoints.salesAgents, action.payload)
        .pipe(map(t => customerActionTypes.loadSalesAgentsSuccess(t)),
          handleEffectError(action))));
  });
}

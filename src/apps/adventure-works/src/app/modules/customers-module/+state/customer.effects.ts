import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, mergeMap } from 'rxjs/operators';

import { customersFeature, State } from './customer.reducer';
import * as customerActionTypes from './customer.actions';
import { CustomerApiService } from '../customers-crud';
import { ICustomer } from '../../../models/odata';
import { environment } from '../../../../environments/environment';

@Injectable()
export class CustomerEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private store: Store<State>,
    private readonly customerApiService: CustomerApiService,
  ) { }

  loadCustomersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActionTypes.loadCustomersRequest),
      mergeMap((action: ReturnType<typeof customerActionTypes.loadCustomersRequest>) => this.odataservice
        .fetch<ICustomer>(environment.customerODataEnpoints.customers, action.payload)
        .pipe(
          map(t => customerActionTypes.loadCustomersSuccess(t)),
          handleEffectError(action)))));

  reloadCustomersEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActionTypes.reloadCustomersRequest),
      concatLatestFrom(() => this.store.select(customersFeature.selectGridODataState)),
      mergeMap(([action, odataState]) => this.odataservice
        .fetch<ICustomer>(environment.customerODataEnpoints.customers, odataState)
        .pipe(
          map(t => customerActionTypes.reloadCustomersSuccess(t)),
          handleEffectError(action)))));

  saveCustomerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActionTypes.saveCustomerRequest),
      mergeMap((action: ReturnType<typeof customerActionTypes.saveCustomerRequest>) => this.customerApiService.post(action.payload).pipe(
        map(() => customerActionTypes.reloadCustomersRequest()),
        handleEffectError(action)))));

  updateCustomerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActionTypes.updateCustomerRequest),
      mergeMap((action: ReturnType<typeof customerActionTypes.updateCustomerRequest>) => this.customerApiService.put(action.payload).pipe(
        map(() => customerActionTypes.reloadCustomersRequest()),
        handleEffectError(action)))));

  deleteCustomerEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(customerActionTypes.deleteCustomerRequest),
      mergeMap((action: ReturnType<typeof customerActionTypes.deleteCustomerRequest>) => this.customerApiService.delete(action.payload).pipe(
        map(() => customerActionTypes.reloadCustomersRequest()),
        handleEffectError(action)
      )))
  );
}

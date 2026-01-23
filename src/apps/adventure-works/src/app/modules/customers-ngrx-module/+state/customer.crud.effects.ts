import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import * as customerActionTypes from './customer.actions';
import { CustomerApiService } from '../customer.api.service';

@Injectable()
export class CustomerCrudEffects {
  private readonly actions$ = inject(Actions);
  private readonly odataService = inject(ODataService);
  private readonly customerApiService = inject(CustomerApiService);

  saveCustomerEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.saveCustomerRequest),
      switchMap(
        (action: ReturnType<typeof customerActionTypes.saveCustomerRequest>) =>
          this.customerApiService.post(action.payload).pipe(
            map(() => customerActionTypes.reloadCustomersRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  updateCustomerEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.updateCustomerRequest),
      switchMap(
        (
          action: ReturnType<typeof customerActionTypes.updateCustomerRequest>,
        ) =>
          this.customerApiService.put(action.payload).pipe(
            map(() => customerActionTypes.reloadCustomersRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteCustomerEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.deleteCustomerRequest),
      switchMap(
        (
          action: ReturnType<typeof customerActionTypes.deleteCustomerRequest>,
        ) =>
          this.customerApiService.delete(action.payload).pipe(
            map(() => customerActionTypes.reloadCustomersRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });
}

import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { customersFeature } from './customer.feature';
import * as customerActionTypes from './customer.actions';
import { ICustomer } from '../../../models/webapi';
import { environment } from '@env';

@Injectable()
export class CustomerListEffects {
  private readonly actions$ = inject(Actions);
  private readonly odataService = inject(ODataService);
  private readonly store = inject(Store);

  loadCustomersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.loadCustomersRequest),
      switchMap(
        (action: ReturnType<typeof customerActionTypes.loadCustomersRequest>) =>
          this.odataService
            .fetch<ICustomer>(
              environment.odataEnpoints.customers,
              action.payload,
              {
                dateNullableProps: [],
              },
            )
            .pipe(
              map((t) => customerActionTypes.loadCustomersSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  reloadCustomersEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.reloadCustomersRequest),
      concatLatestFrom(() =>
        this.store.select(customersFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<ICustomer>(environment.odataEnpoints.customers, odataState, {
            bustCache: true,
            dateNullableProps: [],
          })
          .pipe(
            map((t) => customerActionTypes.reloadCustomersSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });
}

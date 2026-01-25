import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import * as customerActionTypes from './customer.actions';
import { ISalesAgent } from '../../../models/webapi';
import { environment } from '@env';

@Injectable()
export class CustomerLookupEffects {
  private readonly actions$ = inject(Actions);
  private readonly odataService = inject(ODataService);

  loadSalesAgentsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(customerActionTypes.loadSalesAgentsRequest),
      switchMap(
        (
          action: ReturnType<typeof customerActionTypes.loadSalesAgentsRequest>,
        ) =>
          this.odataService
            .fetch<ISalesAgent>(
              environment.odataEnpoints.salesAgents,
              action.payload,
            )
            .pipe(
              map((t) => customerActionTypes.loadSalesAgentsSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });
}

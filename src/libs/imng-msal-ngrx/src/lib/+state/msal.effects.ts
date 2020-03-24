import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as fromMsal from './msal.reducer';
import * as MsalActions from './msal.actions';

@Injectable()
export class MsalEffects {
  loadMsal$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MsalActions.loadMsal),
      fetch({
        run: action => {
          // Your custom service 'load' logic goes here. For now just return a success action...
          return MsalActions.loadMsalSuccess({ msal: [] });
        },

        onError: (action, error) => {
          console.error('Error', error);
          return MsalActions.loadMsalFailure({ error });
        },
      }),
    ),
  );

  constructor(private actions$: Actions) {}
}

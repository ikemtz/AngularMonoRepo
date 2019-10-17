import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { NursesPartialState } from './nurses.reducer';
import * as NursesActions from './nurses.actions';
import { IEmployee } from '../../models/emp-api';
import { ODataService } from 'imng-kendo-odata';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/nurser-ui/src/environments/environment';
import { map } from 'rxjs/operators';
import { createPayload } from 'imng-ngrx-utils';

@Injectable()
export class NursesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<NursesPartialState>,
    private readonly odataservice: ODataService,
  ) {}
  loadNursesEffect$ = createEffect(() =>
    this.dataPersistence.fetch(NursesActions.loadNursesRequest, {
      run: (action: ReturnType<typeof NursesActions.loadNursesRequest>, state: NursesPartialState) =>
        this.odataservice
          .fetch<IEmployee>(environment.endPoints.emplMs.ODataEndpoint, action.payload)
          .pipe(map(t => NursesActions.loadNursesSuccess(createPayload(t)))),
      onError: this.exceptionHandler,
    }),
  );
  private exceptionHandler(action, error) {
    console.error('Error', error);
    return NursesActions.loadNursesFailure(createPayload({ error }));
  }
}

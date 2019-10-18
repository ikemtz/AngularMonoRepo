import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { NursesPartialState, NURSES_FEATURE_KEY } from './nurses.reducer';
import * as NursesActions from './nurses.actions';
import { IEmployee } from '../../models/emp-api';
import { ODataService } from 'imng-kendo-odata';
// tslint:disable-next-line: nx-enforce-module-boundaries
import { environment } from 'apps/nurser-ui/src/environments/environment';
import { map } from 'rxjs/operators';
import { createPayload } from 'imng-ngrx-utils';
import { NursesApiService } from '../services/nurses-api.service';

@Injectable()
export class NursesEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly dataPersistence: DataPersistence<NursesPartialState>,
    private readonly odataservice: ODataService,
    private readonly nursesApiService: NursesApiService,
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

  saveNurseEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(NursesActions.saveNurseRequest, {
      run: (action: ReturnType<typeof NursesActions.saveNurseRequest>, state: NursesPartialState) =>
        this.nursesApiService
          .put(action.payload)
          .pipe(map(t => NursesActions.loadNursesRequest(createPayload(state[NURSES_FEATURE_KEY].gridODataState)))),
      onError: this.exceptionHandler,
    }),
  );

  updateNurseEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(NursesActions.updateNurseRequest, {
      run: (action: ReturnType<typeof NursesActions.updateNurseRequest>, state: NursesPartialState) =>
        this.nursesApiService
          .post(action.payload)
          .pipe(map(t => NursesActions.loadNursesRequest(createPayload(state[NURSES_FEATURE_KEY].gridODataState)))),
      onError: this.exceptionHandler,
    }),
  );

  deleteNurseEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(NursesActions.deleteNurseRequest, {
      run: (action: ReturnType<typeof NursesActions.deleteNurseRequest>, state: NursesPartialState) =>
        this.nursesApiService
          .delete(action.payload)
          .pipe(map(t => NursesActions.loadNursesRequest(createPayload(state[NURSES_FEATURE_KEY].gridODataState)))),
      onError: this.exceptionHandler,
    }),
  );

  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return NursesActions.loadNursesFailure(createPayload({ error }));
  }
}

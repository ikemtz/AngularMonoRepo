import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as actions from './actions';
import { map, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { handleEffectError } from '../error-handlers';
import { useCacheIfExists } from '../use-cache-if-exists';
import { feature } from './feature';
import { HttpClient } from '@angular/common/http';
import { DataRecord } from './data-record';

@Injectable()
export class Effects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly httpClient = inject(HttpClient);

  loadEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.loadRecordsRequest),
      useCacheIfExists(this.store, feature.selectRecords),
      switchMap((action: ReturnType<typeof actions.loadRecordsRequest>) =>
        this.httpClient.get<DataRecord[]>(`/api/cache-test`).pipe(
          map((t) => actions.loadRecordsSuccess(t)),
          handleEffectError(action),
        ),
      ),
    );
  });
}

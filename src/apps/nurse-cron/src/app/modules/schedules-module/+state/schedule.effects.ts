import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
rimport { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
om 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { schedulesFeature } from './schedule.reducer';
import * as scheduleActionTypes from './schedule.actions';
import { environment } from '../../../../environments/environment';

import { ScheduleApiService } from '../schedules-crud';
import { ISchedule } from '../../.import { EffectsModule } from '@ngrx/effects';rimport { concatLatestFrom } from '@ngrx/operators';
t class ScheduleEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly scheduleApiService: ScheduleApiService,
  ) {}

  loadSchedulesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.loadSchedulesRequest),
      switchMap(
        (action: ReturnType<typeof scheduleActionTypes.loadSchedulesRequest>) =>
          this.odataService
            .fetch<ISchedule>(
              environment.endPoints.schedules.schedulesOData,
              action.payload,
            )
            .pipe(
              map((t) => scheduleActionTypes.loadSchedulesSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  reloadSchedulesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.reloadSchedulesRequest),
      concatLatestFrom(() =>
        this.store.select(schedulesFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<ISchedule>(
            environment.endPoints.schedules.schedulesOData,
            odataState,
            {
              bustCache: true,
            },
          )
          .pipe(
            map((t) => scheduleActionTypes.reloadSchedulesSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  saveScheduleEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.saveScheduleRequest),
      switchMap(
        (action: ReturnType<typeof scheduleActionTypes.saveScheduleRequest>) =>
          this.scheduleApiService.post(action.payload).pipe(
            map(() => scheduleActionTypes.reloadSchedulesRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  updateScheduleEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.updateScheduleRequest),
      switchMap(
        (
          action: ReturnType<typeof scheduleActionTypes.updateScheduleRequest>,
        ) =>
          this.scheduleApiService.put(action.payload).pipe(
            map(() => scheduleActionTypes.reloadSchedulesRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteScheduleEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.deleteScheduleRequest),
      switchMap(
        (
          action: ReturnType<typeof scheduleActionTypes.deleteScheduleRequest>,
        ) =>
          this.scheduleApiService.delete(action.payload).pipe(
            map(() => scheduleActionTypes.reloadSchedulesRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });
}

import { Injectable, inject } from '@angular/core';
import { environment } from '@env*';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { switchMap, map } from 'rxjs';
import { ISchedule } from '../../../models/schedules-odata';
import { ScheduleApiService } from '../schedules-crud';
import { schedulesFeature } from './schedule.reducer';
import * as scheduleActionTypes from './schedule.actions';

@Injectable()
export class ScheduleEffects {
  private readonly actions$ = inject(Actions);
  private readonly odataService = inject(ODataService);
  private readonly store = inject(Store);
  private readonly scheduleApiService = inject(ScheduleApiService);


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

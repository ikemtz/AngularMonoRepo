import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { schedulesFeature } from './schedule.reducer';
import * as scheduleActionTypes from './schedule.actions';
import { environment } from '../../../../environments/environment';

import { ScheduleApiService } from '../schedules-crud';
import { ISchedule } from '../../../models/schedules-odata';

@Injectable()
export class ScheduleEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store: Store,
    private readonly scheduleApiService: ScheduleApiService,
  ) { }

  loadSchedulesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.loadSchedulesRequest),
      switchMap((action: ReturnType<typeof scheduleActionTypes.loadSchedulesRequest>) => this.odataservice
        .fetch<ISchedule>(environment.endPoints.schedules.schedulesOData, action.payload)
        .pipe(
          map(t => scheduleActionTypes.loadSchedulesSuccess(t)),
          handleEffectError(action))));
  });

  reloadSchedulesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.reloadSchedulesRequest),
      concatLatestFrom(() => this.store.select(schedulesFeature.selectGridODataState)),
      switchMap(([action, odataState]) => this.odataservice
        .fetch<ISchedule>(environment.endPoints.schedules.schedulesOData, odataState, {
          bustCache: true,
        })
        .pipe(
          map(t => scheduleActionTypes.reloadSchedulesSuccess(t)),
          handleEffectError(action))));
  });

  saveScheduleEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.saveScheduleRequest),
      switchMap((action: ReturnType<typeof scheduleActionTypes.saveScheduleRequest>) => this.scheduleApiService.post(action.payload).pipe(
        map(() => scheduleActionTypes.reloadSchedulesRequest()),
        handleEffectError(action))));
  });

  updateScheduleEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.updateScheduleRequest),
      switchMap((action: ReturnType<typeof scheduleActionTypes.updateScheduleRequest>) => this.scheduleApiService.put(action.payload).pipe(
        map(() => scheduleActionTypes.reloadSchedulesRequest()),
        handleEffectError(action))));
  });

  deleteScheduleEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(scheduleActionTypes.deleteScheduleRequest),
      switchMap((action: ReturnType<typeof scheduleActionTypes.deleteScheduleRequest>) => this.scheduleApiService.delete(action.payload).pipe(
        map(() => scheduleActionTypes.reloadSchedulesRequest()),
        handleEffectError(action))));
  });
}

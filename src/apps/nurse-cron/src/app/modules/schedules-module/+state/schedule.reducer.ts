import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import { ISchedule } from '../../../models/schedules-odata';

import * as scheduleActionTypes from './schedule.actions';
export const SCHEDULES_FEATURE_KEY = 'schedules';

export interface State extends KendoODataGridState<ISchedule> {
  currentSchedule: ISchedule | undefined;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentSchedule: undefined,
  loading: true,
};

export const schedulesFeature = createFeature({
  name: SCHEDULES_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(scheduleActionTypes.loadSchedulesRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(scheduleActionTypes.loadSchedulesSuccess,
      scheduleActionTypes.reloadSchedulesSuccess,
      (state, { payload }): State => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null,
      })),
    on(scheduleActionTypes.setCurrentSchedule,
      (state, { payload }): State =>
        ({ ...state, currentSchedule: payload })),
    on(scheduleActionTypes.clearCurrentSchedule,
      (state): State => ({ ...state, currentSchedule: undefined })),
    on(scheduleActionTypes.saveScheduleRequest,
      scheduleActionTypes.updateScheduleRequest,
      scheduleActionTypes.deleteScheduleRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});

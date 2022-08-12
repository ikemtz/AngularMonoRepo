import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { ISchedule } from '../../../models/schedules-odata';

export const loadSchedulesRequest = createPayloadAction<ODataState>(
    '[Schedules] Load Schedules Request');
export const loadSchedulesSuccess = createPayloadAction<ODataResult<ISchedule>>(
    '[Schedules] Load Schedules Success');
export const reloadSchedulesRequest = createAction(
    '[Schedules] Reload Schedules Request');
export const reloadSchedulesSuccess = createPayloadAction<ODataResult<ISchedule>>(
    '[Schedules] Reload Schedules Success');

export const clearCurrentSchedule = createAction('[Schedules] Clear Current Schedule');
export const setCurrentSchedule = createPayloadAction<ISchedule>('[Schedules] Set Current Schedule');
export const saveScheduleRequest = createPayloadAction<ISchedule>('[Schedules] Save Schedule Request');
export const updateScheduleRequest = createPayloadAction<ISchedule>('[Schedules] Update Schedule Request');
export const deleteScheduleRequest = createPayloadAction<ISchedule>('[Schedules] Delete Schedule Request');


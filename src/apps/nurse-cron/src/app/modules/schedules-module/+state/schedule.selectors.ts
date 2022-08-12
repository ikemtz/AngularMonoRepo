import { createSelector } from '@ngrx/store';
import { schedulesFeature } from './schedule.reducer';
import { isTruthy } from 'imng-ngrx-utils';

const selectIsEditScheduleActive = createSelector(
  schedulesFeature.selectCurrentSchedule,
  (entity) => isTruthy(entity?.id));
const selectIsNewScheduleActive = createSelector(
  schedulesFeature.selectCurrentSchedule,
  (entity) => isTruthy(entity) && !isTruthy(entity?.id));
export const dataEntryScheduleQueries = {
  selectCurrentSchedule: schedulesFeature.selectCurrentSchedule,
  selectIsEditScheduleActive,
  selectIsNewScheduleActive,
};

export const scheduleQueries = { ...dataEntryScheduleQueries };


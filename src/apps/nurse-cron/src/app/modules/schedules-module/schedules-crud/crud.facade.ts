import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { schedulesFeature } from '../+state/schedule.reducer';
import { scheduleQueries } from '../+state/schedule.selectors';
import * as scheduleActionTypes from '../+state/schedule.actions';
import { ISchedule } from '../../../models/schedules-odata';

@Injectable()
export class ScheduleCrudFacade implements IDataEntryFacade<ISchedule> {
  loading$ = this.store.select(schedulesFeature.selectLoading);
  currentEntity$ = this.store.select(scheduleQueries.selectCurrentSchedule);
  isEditActive$ = this.store.select(scheduleQueries.selectIsEditScheduleActive);
  isNewActive$ = this.store.select(scheduleQueries.selectIsNewScheduleActive);

  constructor(private readonly store: Store) { }

  public setCurrentEntity(item: ISchedule): void {
    this.store.dispatch(scheduleActionTypes.setCurrentSchedule(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(scheduleActionTypes.clearCurrentSchedule());
  }

  public saveNewEntity(item: ISchedule): void {
    this.store.dispatch(scheduleActionTypes.saveScheduleRequest(item));
  }

  public updateExistingEntity(item: ISchedule): void {
    this.store.dispatch(scheduleActionTypes.updateScheduleRequest(item));
  }

}

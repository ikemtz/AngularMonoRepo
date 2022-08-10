import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { schedulesFeature } from '../+state/schedule.reducer';
import * as scheduleActionTypes from '../+state/schedule.actions';
import { ISchedule } from '../../../models/schedules-odata';

@Injectable()
export class ScheduleListFacade implements IKendoODataGridFacade<ISchedule>, IDataDeleteFacade<ISchedule> {
  loading$ = this.store.select(schedulesFeature.selectLoading);
  gridData$ = this.store.select(schedulesFeature.selectGridData);
  gridPagerSettings$ = this.store.select(schedulesFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(schedulesFeature.selectGridODataState);

  constructor(private readonly store: Store) { }

  public loadEntities(state: ODataState): void {
    this.store.dispatch(scheduleActionTypes.loadSchedulesRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(scheduleActionTypes.reloadSchedulesRequest());
  }

  public deleteExistingEntity(entity: ISchedule): void {
    this.store.dispatch(scheduleActionTypes.deleteScheduleRequest(entity));
  }
}

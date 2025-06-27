import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { ScheduleListFacade } from './list.facade';
import { ScheduleCrudFacade } from '../schedules-crud';
import { ScheduleProperties, ISchedule } from '../../../models/schedules-odata';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    ScheduleProperties.ID,
    ScheduleProperties.UNIT_ID,
    ScheduleProperties.UNIT_NAME,
    ScheduleProperties.EMPLOYEE_ID,
    ScheduleProperties.EMPLOYEE_NAME,
    ScheduleProperties.STAFFING_REQUIREMENT_ID,
    ScheduleProperties.START_TIME_UTC,
    ScheduleProperties.SCHEDULED_HOURS,
    ScheduleProperties.APPROVED_ON_UTC,
  ],
  sort: [
    { field: ScheduleProperties.UNIT_ID, dir: 'asc' },
  ],
};

@Component({
    selector: 'nrcrn-schedule-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ScheduleListComponent extends KendoODataBasedComponent<ISchedule, ScheduleListFacade> {
  readonly crudFacade = inject(ScheduleCrudFacade);

  public readonly props = ScheduleProperties;
  public currentItem: ISchedule | undefined;

  constructor() {
    const facade = inject(ScheduleListFacade);
    const router = inject(Router);

    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: ISchedule): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: ISchedule): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}

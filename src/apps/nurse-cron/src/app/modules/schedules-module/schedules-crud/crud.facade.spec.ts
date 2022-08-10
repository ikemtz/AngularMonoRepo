import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { createODataPayload } from 'imng-kendo-odata';
import { of } from 'rxjs';

import { ScheduleEffects } from '../+state/schedule.effects';
import { schedulesFeature } from '../+state/schedule.reducer';
import { ScheduleCrudFacade } from './crud.facade';
import { ScheduleApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { ISchedule, ScheduleProperties } from '../../../models/schedules-odata';

export const createSchedule = () =>
  <ISchedule>{
    [ScheduleProperties.ID]: 'ID',
    [ScheduleProperties.UNIT_ID]: 'UNIT_ID',
    [ScheduleProperties.UNIT_NAME]: 'UNIT_NAME',
    [ScheduleProperties.EMPLOYEE_ID]: 'EMPLOYEE_ID',
    [ScheduleProperties.EMPLOYEE_NAME]: 'EMPLOYEE_NAME',
    [ScheduleProperties.STAFFING_REQUIREMENT_ID]: 'STAFFING_REQUIREMENT_ID',
    [ScheduleProperties.START_TIME_UTC]: new Date(),
    [ScheduleProperties.SCHEDULED_HOURS]: 0,
    [ScheduleProperties.APPROVED_ON_UTC]: new Date(),
  };

describe('ScheduleCrudFacade', () => {
  let facade: ScheduleCrudFacade;
  let store: Store;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { }); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(schedulesFeature),
          EffectsModule.forFeature([ScheduleEffects]),
        ],
        providers: [
          ScheduleCrudFacade,
          ScheduleApiService,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createSchedule()]))) } },
        ],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      store = TestBed.inject(Store);
      facade = TestBed.inject(ScheduleCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentSchedule to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<ScheduleCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<ScheduleCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<ScheduleCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<ScheduleCrudFacade>(facade, httpClient));
  });
});

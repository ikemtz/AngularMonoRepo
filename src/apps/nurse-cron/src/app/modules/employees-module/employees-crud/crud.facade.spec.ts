import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
oimport { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
f } from 'rxjs';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';

import { EmployeeEffects } from '../+state/employee.effects';
import { employeesFeature } from '../+stimport { EffectsModule } from '@ngrx/effects';cimport { concatLatestFrom } from '@ngrx/operators';
ade } from './crud.facade';
import { EmployeeApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { createODataPayload } from 'imng-kendo-odata';
import { IEmployee, EmployeeProperties } from '../../../models/employees-odata';

export const createEmployee = () =>
  <IEmployee>{
    [EmployeeProperties.ID]: 'ID',
    [EmployeeProperties.LAST_NAME]: 'LAST_NAME',
    [EmployeeProperties.FIRST_NAME]: 'FIRST_NAME',
    [EmployeeProperties.BIRTH_DATE]: new Date(),
    [EmployeeProperties.MOBILE_PHONE]: 'MOBILE_PHONE',
    [EmployeeProperties.HOME_PHONE]: 'HOME_PHONE',
    [EmployeeProperties.PHOTO]: 'PHOTO',
    [EmployeeProperties.EMAIL]: 'EMAIL',
    [EmployeeProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',
    [EmployeeProperties.ADDRESS_LINE_2]: 'ADDRESS_LINE_2',
    [EmployeeProperties.CITY]: 'CITY',
    [EmployeeProperties.STATE]: 'ST',
    [EmployeeProperties.ZIP]: 'ZIP',
    [EmployeeProperties.IS_ENABLED]: true,
    [EmployeeProperties.HIRE_DATE]: new Date(),
    [EmployeeProperties.FIRE_DATE]: new Date(),
    [EmployeeProperties.TOTAL_HOURS_OF_SERVICE]: 0,
    [EmployeeProperties.CERTIFICATION_COUNT]: 0,
    [EmployeeProperties.COMPETENCY_COUNT]: 0,
    [EmployeeProperties.HEALTH_ITEM_COUNT]: 0,
  };

describe('EmployeeCrudFacade', () => {
  let facade: EmployeeCrudFacade;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(employeesFeature),
          EffectsModule.forFeature([EmployeeEffects]),
        ],
        providers: [
          EmployeeCrudFacade,
          EmployeeApiService,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() => of(createODataPayload([createEmployee()]))),
            },
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      facade = TestBed.inject(EmployeeCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentEmployee to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<EmployeeCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<EmployeeCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<EmployeeCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<EmployeeCrudFacade>(facade, httpClient));
  });
});

import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '@env/nurse-cron';

import { EmployeeEffects } from '../+state/employee.effects';
import {
  EmployeesPartialState,
  initialState,
  reducer as employeeReducer,
  EMPLOYEES_FEATURE_KEY
} from '../+state/employee.reducer';
import { EmployeeCrudFacade } from './crud.facade';
import { EmployeeApiService } from './api.service';
import { IEmployee, EmployeeProperties } from '../../../models/employees-odata';

interface TestSchema {
  [EMPLOYEES_FEATURE_KEY]: EmployeesPartialState;
}

export const createEmployee = () =>
  <IEmployee>{
    [EmployeeProperties.ID]: 'ID',
    [EmployeeProperties.LAST_NAME]: 'LAST_NAME',
    [EmployeeProperties.FIRST_NAME]: 'FIRST_NAME',
    [EmployeeProperties.BIRTH_DATE]: new Date(),
    [EmployeeProperties.MOBILE_PHONE]: 'MOBILE_PHO',
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
  let store: Store<TestSchema>;



  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(EMPLOYEES_FEATURE_KEY, employeeReducer, { initialState }),
          EffectsModule.forFeature([EmployeeEffects]),
          HttpClientTestingModule,
        ],
        providers: [EmployeeCrudFacade, EmployeeApiService],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(EmployeeCrudFacade);
    });

    it('clearCurrentEntity() should set currentEmployee to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();

      expect(await readFirst(store)).toMatchSnapshot();

    });

    it('New Entity Set And Clear CurrentEntity', async () =>
      await testAddSetAndClearCurrentEntity<EmployeeCrudFacade>(facade));
    it('Existing Entity Set And Clear CurrentEntity', async () =>
      await testEditSetAndClearCurrentEntity<EmployeeCrudFacade>(facade));
    it('Save CurrentEntity', async () =>
      await testSaveCurrentEntity<EmployeeCrudFacade>(facade, TestBed.inject(HttpClient)));
    it('Update CurrentEntity', async () =>
      await testUpdateCurrentEntity<EmployeeCrudFacade>(facade, TestBed.inject(HttpClient)));
  });
});

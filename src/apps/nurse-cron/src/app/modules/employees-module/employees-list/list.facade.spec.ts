import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { ODataState } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';

import { EmployeeEffects } from '../+state/employee.effects';
import * as employeeActionTypes from '../+state/employee.actions';
import { EmployeesPartialState, initialState, reducer as employeeReducer, EMPLOYEES_FEATURE_KEY } from '../+state/employee.reducer';
import { EmployeeListFacade } from './list.facade';
import { IEmployee, EmployeeProperties } from '../../../models/employees-odata';
import { environment } from '@env/nurse-cron';

interface TestSchema {
  [EMPLOYEES_FEATURE_KEY]: EmployeesPartialState;
}

export const createEmployee = () => <IEmployee>{
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

describe('EmployeeListFacade', () => {
  let facade: EmployeeListFacade;
  let store: Store<TestSchema>;
  let httpClient: HttpClient;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(EMPLOYEES_FEATURE_KEY, employeeReducer, { initialState }),
          EffectsModule.forFeature([EmployeeEffects]),
        ],
        providers: [EmployeeListFacade,
          { provide: HttpClient, useValue: { get: jest.fn(() => of({ value: [createEmployee()], '@odata.count': 1 })) } },
        ],
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
      facade = TestBed.inject(EmployeeListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(0);
        facade.loadEntities({});

        list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(1);
        expect(httpClient.get).toBeCalledTimes(1);
        expect(httpClient.get).toBeCalledWith('employees-odata/odata/v1/Employees?&$count=true');
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should get the grid state', async done => {
      try {
        const filteringState: ODataState = {
          filter: { logic: 'and', filters: [{ field: '💩', operator: 'eq', value: '🍑' }] },
        };
        let state = await readFirst(facade.gridODataState$);
        expect(state.count).toBeUndefined();
        facade.loadEntities(filteringState);

        state = await readFirst(facade.gridODataState$);
        expect(state).toStrictEqual(filteringState);

        facade.loadEntities({});
        state = await readFirst(facade.gridODataState$);
        expect(state).toStrictEqual({});
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `employeesLoaded` to manually submit list for state management
     */
    it('gridData$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(0);
        store.dispatch(employeeActionTypes.loadEmployeesSuccess({ data: [createEmployee(), createEmployee()], total: 0 }));

        list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(2);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should handle DeleteItem', done => {
      testDeleteCurrentEntity(done, facade, httpClient);
    });
  });
});

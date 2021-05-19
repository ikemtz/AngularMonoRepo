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
import { environment } from '@env-nurse-cron';

import { HealthItemEffects } from '../+state/health-item.effects';
import * as healthItemActionTypes from '../+state/health-item.actions';
import {
  HealthItemsPartialState,
  initialState,
  reducer as healthItemReducer,
  HEALTH_ITEMS_FEATURE_KEY
} from '../+state/health-item.reducer';
import { HealthItemListFacade } from './list.facade';
import { IHealthItem, HealthItemProperties } from '../../../models/health-items-odata';

interface TestSchema {
  [HEALTH_ITEMS_FEATURE_KEY]: HealthItemsPartialState;
}

export const createHealthItem = () => <IHealthItem>{
  [HealthItemProperties.ID]: 'ID',
  [HealthItemProperties.NAME]: 'NAME',
  [HealthItemProperties.IS_ENABLED]: true,
};

describe('HealthItemListFacade', () => {
  let facade: HealthItemListFacade;
  let store: Store<TestSchema>;
  let httpClient: HttpClient;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(HEALTH_ITEMS_FEATURE_KEY, healthItemReducer, { initialState }),
          EffectsModule.forFeature([HealthItemEffects]),
        ],
        providers: [HealthItemListFacade,
          { provide: HttpClient, useValue: { get: jest.fn(() => of({ value: [createHealthItem()], '@odata.count': 1 })) } },
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
      facade = TestBed.inject(HealthItemListFacade);
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
        expect(httpClient.get).toBeCalledWith('health-items-odata/odata/v1/HealthItems?&$count=true');
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
     * Use `healthItemsLoaded` to manually submit list for state management
     */
    it('gridData$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(0);
        store.dispatch(healthItemActionTypes.loadHealthItemsSuccess({ data: [createHealthItem(), createHealthItem()], total: 0 }));

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

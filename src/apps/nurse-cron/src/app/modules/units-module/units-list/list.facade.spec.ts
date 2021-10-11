import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { ODataService, ODataState } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { Observable, of } from 'rxjs';
import { environment } from '@env/nurse-cron';

import { UnitEffects } from '../+state/unit.effects';
import * as unitActionTypes from '../+state/unit.actions';
import { UnitsPartialState, initialState, reducer as unitReducer, UNITS_FEATURE_KEY } from '../+state/unit.reducer';
import { UnitListFacade } from './list.facade';
import { IUnit, UnitProperties } from '../../../models/units-odata';

interface TestSchema {
  [UNITS_FEATURE_KEY]: UnitsPartialState;
}

export const createUnit = () =>
  <IUnit>{
    [UnitProperties.ID]: 'ID',
    [UnitProperties.BUILDING_ID]: 'BUILDING_ID',
    [UnitProperties.NAME]: 'NAME',
    [UnitProperties.ROOM_COUNT]: 0,
    [UnitProperties.DELETED_BY]: 'DELETED_BY',
    [UnitProperties.DELETED_ON_UTC]: new Date(),
    [UnitProperties.BUILDING]: 'BUILDING',
  };

describe('UnitListFacade', () => {
  let facade: UnitListFacade;
  let store: Store<TestSchema>;
  let httpClient: HttpClient;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(UNITS_FEATURE_KEY, unitReducer, { initialState }),
          EffectsModule.forFeature([UnitEffects]),
        ],
        providers: [
          UnitListFacade,
          { provide: HttpClient, useValue: { get: jest.fn(() => of({ value: [createUnit()], '@odata.count': 1 })) } },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(UnitListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      facade.loadEntities({});

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(1);
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith('units-odata/odata/v1/Units?&$count=true');
    });

    it('should get the grid state', async () => {
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
    });

    it('reloadEntities() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.gridData$);
      let isloading = await readFirst(facade.loading$);

      const service: { fetch: (endpoint, odataState) => Observable<unknown> } = TestBed.inject(ODataService);
      const response = of({ data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }], total: 3 });
      service.fetch = jest.fn(() => response);

      expect(list.data.length).toBe(0);
      expect(isloading).toBe(false);
      facade.reloadEntities();

      list = await readFirst(facade.gridData$);
      isloading = await readFirst(facade.loading$);

      expect(list.data.length).toBe(3);
      expect(isloading).toBe(false);
      expect(service.fetch).toBeCalledTimes(1);
    });

    /**
     * Use `unitsLoaded` to manually submit list for state management
     */
    it('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      store.dispatch(unitActionTypes.loadUnitsSuccess({ data: [createUnit(), createUnit()], total: 0 }));

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(2);
    });

    it('should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});

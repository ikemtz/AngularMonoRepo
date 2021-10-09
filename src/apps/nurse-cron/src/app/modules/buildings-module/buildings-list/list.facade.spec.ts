import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { ODataState } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';
import { environment } from '@env/nurse-cron';

import { BuildingEffects } from '../+state/building.effects';
import * as buildingActionTypes from '../+state/building.actions';
import {
  BuildingsPartialState,
  initialState,
  reducer as buildingReducer,
  BUILDINGS_FEATURE_KEY,
} from '../+state/building.reducer';
import { BuildingListFacade } from './list.facade';
import { IBuilding, BuildingProperties } from '../../../models/units-odata';

interface TestSchema {
  [BUILDINGS_FEATURE_KEY]: BuildingsPartialState;
}

export const createBuilding = () =>
  <IBuilding>{
    [BuildingProperties.ID]: 'ID',
    [BuildingProperties.NAME]: 'NAME',
    [BuildingProperties.SITE_NAME]: 'SITE_NAME',
    [BuildingProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',
    [BuildingProperties.ADDRESS_LINE_2]: 'ADDRESS_LINE_2',
    [BuildingProperties.CITY_OR_MUNICIPALITY]: 'CITY_OR_MUNICIPALITY',
    [BuildingProperties.STATE_OR_PROVIDENCE]: 'STATE_OR_PROVIDENCE',
    [BuildingProperties.POSTAL_CODE]: 'POSTAL_CODE',
    [BuildingProperties.COUNTRY]: 'COU',
    [BuildingProperties.GPS_DATA]: 'GPS_DATA',
    [BuildingProperties.DELETED_BY]: 'DELETED_BY',
    [BuildingProperties.DELETED_ON_UTC]: new Date(),
  };

describe('BuildingListFacade', () => {
  let facade: BuildingListFacade;
  let store: Store<TestSchema>;
  let httpClient: HttpClient;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BUILDINGS_FEATURE_KEY, buildingReducer, { initialState }),
          EffectsModule.forFeature([BuildingEffects]),
        ],
        providers: [
          BuildingListFacade,
          {
            provide: HttpClient,
            useValue: { get: jest.fn(() => of({ value: [createBuilding()], '@odata.count': 1 })) },
          },
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
      facade = TestBed.inject(BuildingListFacade);
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
      expect(httpClient.get).toBeCalledWith('buildings-odata/odata/v1/Buildings?&$count=true');
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

    /**
     * Use `buildingsLoaded` to manually submit list for state management
     */
    it('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      store.dispatch(
        buildingActionTypes.loadBuildingsSuccess({ data: [createBuilding(), createBuilding()], total: 0 }),
      );

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(2);
    });

    it('should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});

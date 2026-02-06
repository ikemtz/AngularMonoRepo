import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import {
  ODataState,
  createODataPayload,
  createODataResult,
  ODataService,
} from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { Observable, of } from 'rxjs';

import { BuildingEffects } from '../+state/building.effects';
import * as buildingActionTypes from '../+state/building.actions';
import { buildingsFeature } from '../+state/building.reducer';
import { BuildingListFacade } from './list.facade';
import { environment } from '../../../../environments/environment';
import { createTestBuilding } from '../../../models/units-odata';

describe('BuildingListFacade', () => {
  let facade: BuildingListFacade;
  let store: Store;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(buildingsFeature),
          EffectsModule.forFeature([BuildingEffects]),
        ],
        providers: [
          BuildingListFacade,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() =>
                of(createODataPayload([createTestBuilding()])),
              ),
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

      store = TestBed.inject(Store);
      facade = TestBed.inject(BuildingListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadEntities() returns an array of (1)
     */
    test('loadEntities() should return a list of (1) with loading == false and httpClient.get is invoked', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data).toHaveLength(0);
      facade.loadEntities({});

      list = await readFirst(facade.gridData$);
      const loading = await readFirst(facade.loading$);
      expect(list.data).toHaveLength(1);
      expect(loading).toBe(false);
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      expect(httpClient.get).toHaveBeenCalledWith(
        'buildings-odata/odata/v1/Buildings?$count=true',
      );

      facade.reloadEntities();
      expect(httpClient.get).toHaveBeenCalledTimes(2);
    });

    test('reloadEntities() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.gridData$);
      let isloading = await readFirst(facade.loading$);

      const service: {
        fetch: (
          endpoint: string,
          odataState: ODataState,
        ) => Observable<unknown>;
      } = TestBed.inject(ODataService);
      const response = of({
        data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }],
        total: 3,
      });
      service.fetch = jest.fn(() => response);

      expect(list.data).toHaveLength(0);
      expect(isloading).toBe(true);
      facade.reloadEntities();

      list = await readFirst(facade.gridData$);
      isloading = await readFirst(facade.loading$);

      expect(list.data).toHaveLength(3);
      expect(isloading).toBe(false);
      expect(service.fetch).toHaveBeenCalledTimes(1);
    });

    test('it should get the grid state', async () => {
      const filteringState: ODataState = {
        filter: {
          logic: 'and',
          filters: [{ field: '💩', operator: 'eq', value: '🍑' }],
        },
      };
      let state = await readFirst(facade.gridODataState$);
      expect(state?.count).toBeUndefined();
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
    test('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data).toHaveLength(0);
      store.dispatch(
        buildingActionTypes.loadBuildingsSuccess(
          createODataResult([createTestBuilding(), createTestBuilding()]),
        ),
      );

      list = await readFirst(facade.gridData$);
      expect(list.data).toHaveLength(2);
    });

    test('it should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});

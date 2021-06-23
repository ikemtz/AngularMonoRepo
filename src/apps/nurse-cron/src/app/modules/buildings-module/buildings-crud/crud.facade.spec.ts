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

import { BuildingEffects } from '../+state/building.effects';
import {
  BuildingsPartialState,
  initialState,
  reducer as buildingReducer,
  BUILDINGS_FEATURE_KEY
} from '../+state/building.reducer';
import { BuildingCrudFacade } from './crud.facade';
import { BuildingApiService } from './api.service';
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

describe('BuildingCrudFacade', () => {
  let facade: BuildingCrudFacade;
  let store: Store<TestSchema>;



  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(BUILDINGS_FEATURE_KEY, buildingReducer, { initialState }),
          EffectsModule.forFeature([BuildingEffects]),
          HttpClientTestingModule,
        ],
        providers: [BuildingCrudFacade, BuildingApiService],
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
      facade = TestBed.inject(BuildingCrudFacade);
    });

    it('clearCurrentEntity() should set currentBuilding to null', async done => {
      try {
        let isNewActive = await readFirst(facade.isNewActive$);
        expect(isNewActive).toBeFalsy();

        facade.clearCurrentEntity();
        isNewActive = await readFirst(facade.isNewActive$);

        expect(isNewActive).toBeFalsy();

        expect(await readFirst(store)).toMatchSnapshot();
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('New Entity Set And Clear CurrentEntity', async done =>
      testAddSetAndClearCurrentEntity<BuildingCrudFacade>(done, facade));
    it('Existing Entity Set And Clear CurrentEntity', async done =>
      testEditSetAndClearCurrentEntity<BuildingCrudFacade>(done, facade));
    it('Save CurrentEntity', async done =>
      testSaveCurrentEntity<BuildingCrudFacade>(done, facade, TestBed.inject(HttpClient)));
    it('Update CurrentEntity', async done =>
      testUpdateCurrentEntity<BuildingCrudFacade>(done, facade, TestBed.inject(HttpClient)));
  });
});

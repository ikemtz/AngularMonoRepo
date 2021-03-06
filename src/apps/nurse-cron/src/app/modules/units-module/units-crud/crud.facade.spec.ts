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

import { UnitEffects } from '../+state/unit.effects';
import {
  UnitsPartialState,
  initialState,
  reducer as unitReducer,
  UNITS_FEATURE_KEY
} from '../+state/unit.reducer';
import { UnitCrudFacade } from './crud.facade';
import { UnitApiService } from './api.service';
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

describe('UnitCrudFacade', () => {
  let facade: UnitCrudFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(UNITS_FEATURE_KEY, unitReducer, { initialState }),
          EffectsModule.forFeature([UnitEffects]),
          HttpClientTestingModule,
        ],
        providers: [UnitCrudFacade, UnitApiService],
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
      facade = TestBed.inject(UnitCrudFacade);
    });

    it('clearCurrentEntity() should set currentUnit to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
      expect(await readFirst(store)).toMatchSnapshot();

    });

    it('New Entity Set And Clear CurrentEntity', async () =>
      await testAddSetAndClearCurrentEntity<UnitCrudFacade>(facade));
    it('Existing Entity Set And Clear CurrentEntity', async () =>
      await testEditSetAndClearCurrentEntity<UnitCrudFacade>(facade));
    it('Save CurrentEntity', async () =>
      await testSaveCurrentEntity<UnitCrudFacade>(facade, TestBed.inject(HttpClient)));
    it('Update CurrentEntity', async () =>
      await testUpdateCurrentEntity<UnitCrudFacade>(facade, TestBed.inject(HttpClient)));
  });
});

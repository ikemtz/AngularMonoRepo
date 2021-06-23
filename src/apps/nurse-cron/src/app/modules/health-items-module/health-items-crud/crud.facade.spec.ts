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

import { HealthItemEffects } from '../+state/health-item.effects';
import {
  HealthItemsPartialState,
  initialState,
  reducer as healthItemReducer,
  HEALTH_ITEMS_FEATURE_KEY
} from '../+state/health-item.reducer';
import { HealthItemCrudFacade } from './crud.facade';
import { HealthItemApiService } from './api.service';
import { IHealthItem, HealthItemProperties } from '../../../models/health-items-odata';

interface TestSchema {
  [HEALTH_ITEMS_FEATURE_KEY]: HealthItemsPartialState;
}

export const createHealthItem = () =>
  <IHealthItem>{
    [HealthItemProperties.ID]: 'ID',
    [HealthItemProperties.NAME]: 'NAME',
    [HealthItemProperties.IS_ENABLED]: true,
  };

describe('HealthItemCrudFacade', () => {
  let facade: HealthItemCrudFacade;
  let store: Store<TestSchema>;



  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(HEALTH_ITEMS_FEATURE_KEY, healthItemReducer, { initialState }),
          EffectsModule.forFeature([HealthItemEffects]),
          HttpClientTestingModule,
        ],
        providers: [HealthItemCrudFacade, HealthItemApiService],
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
      facade = TestBed.inject(HealthItemCrudFacade);
    });

    it('clearCurrentEntity() should set currentHealthItem to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();

      expect(await readFirst(store)).toMatchSnapshot();

    });

    it('New Entity Set And Clear CurrentEntity', async () =>
      await testAddSetAndClearCurrentEntity<HealthItemCrudFacade>(facade));
    it('Existing Entity Set And Clear CurrentEntity', async () =>
      await testEditSetAndClearCurrentEntity<HealthItemCrudFacade>(facade));
    it('Save CurrentEntity', async () =>
      await testSaveCurrentEntity<HealthItemCrudFacade>(facade, TestBed.inject(HttpClient)));
    it('Update CurrentEntity', async () =>
      await testUpdateCurrentEntity<HealthItemCrudFacade>(facade, TestBed.inject(HttpClient)));
  });
});

import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '@env';

import { HealthItemEffects } from '../+state/health-item.effects';
import {
  HealthItemsPartialState,
  initialState,
  reducer as healthItemReducer,
  HEALTH_ITEMS_FEATURE_KEY
} from '../+state/health-item.reducer';
import { HealthItemCrudFacade } from './crud.facade';
import { HealthItemApiService } from './api.service';

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

  beforeEach(() => {});

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
      facade = TestBed.inject(HealthItemCrudFacade);
    });

    it('clearCurrentEntity() should set currentHealthItem to null', async done => {
      try {
        let isNewActive = await readFirst(facade.isNewActive$);
        expect(isNewActive).toBeFalsy();

        facade.clearCurrentEntity();
        isNewActive = await readFirst(facade.isNewActive$);

        expect(isNewActive).toBeFalsy();

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('saveNewEntity() should save new Entity', async done => {
      try {
        let isNewActive = await readFirst(facade.isNewActive$);
        expect(isNewActive).toBeFalsy();

        facade.saveNewEntity(createHealthItem());
        isNewActive = await readFirst(facade.isNewActive$);
        expect(isNewActive).toBeFalsy();

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('New Entity Set And Clear CurrentEntity', async done =>
      testAddSetAndClearCurrentEntity<HealthItemCrudFacade>(done, facade));
    it('Existing Entity Set And Clear CurrentEntity', async done =>
      testEditSetAndClearCurrentEntity<HealthItemCrudFacade>(done, facade));
    it('Save CurrentEntity', async done =>
      testSaveCurrentEntity<HealthItemCrudFacade>(done, facade, TestBed.inject(HttpClient)));
    it('Update CurrentEntity', async done =>
      testUpdateCurrentEntity<HealthItemCrudFacade>(done, facade, TestBed.inject(HttpClient)));
  });
});

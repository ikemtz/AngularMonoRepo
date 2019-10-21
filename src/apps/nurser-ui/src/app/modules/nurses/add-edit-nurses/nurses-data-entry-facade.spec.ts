import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { initialState, NursesState, NURSES_FEATURE_KEY, reducer } from '../+state/nurses.reducer';
import { NursesDataEntryFacade } from './nurses-data-entry-facade';
import { NursesEffects } from '../+state/nurses.effects';
import { IEmployee } from '../../models/emp-api';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testUpdateCurrentEntity,
  testSaveCurrentEntity,
} from 'imng-kendo-data-entry/testing';

interface TestSchema {
  [NURSES_FEATURE_KEY]: NursesState;
}

describe('NursesDataEntryFacade', () => {
  let facade: NursesDataEntryFacade;
  let store: Store<TestSchema>;

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(NURSES_FEATURE_KEY, reducer, { initialState }),
          EffectsModule.forFeature([NursesEffects]),
          HttpClientTestingModule,
        ],
        providers: [NursesDataEntryFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({
        imports: [RootModule],
      });

      store = TestBed.get(Store);
      facade = TestBed.get(NursesDataEntryFacade);
    });

    it('New Entity Set And Clear CurrentEntity', async done =>
      testAddSetAndClearCurrentEntity<NursesDataEntryFacade>(done, facade));
    it('Existing Entity Set And Clear CurrentEntity', async done =>
      testEditSetAndClearCurrentEntity<NursesDataEntryFacade>(done, facade));
    it('Save CurrentEntity', async done =>
      testSaveCurrentEntity<NursesDataEntryFacade>(done, facade, TestBed.get(HttpClient)));
    it('Update CurrentEntity', async done =>
      testUpdateCurrentEntity<NursesDataEntryFacade>(done, facade, TestBed.get(HttpClient)));
  });
});

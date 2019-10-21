import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { initialState, NursesState, NURSES_FEATURE_KEY, reducer } from '../+state/nurses.reducer';

import { NursesEffects } from '../+state/nurses.effects';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testUpdateCurrentEntity,
  testSaveCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { NurseCertificationDataEntryFacade } from './nurse-certification-data-entry-facade';

interface TestSchema {
  [NURSES_FEATURE_KEY]: NursesState;
}

describe('NurseCertificationDataEntryFacade', () => {
  let facade: NurseCertificationDataEntryFacade;
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
        providers: [NurseCertificationDataEntryFacade],
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
      facade = TestBed.get(NurseCertificationDataEntryFacade);
    });

    it('New Entity Set And Clear CurrentEntity', async done =>
      testAddSetAndClearCurrentEntity<NurseCertificationDataEntryFacade>(done, facade));
    it('Existing Entity Set And Clear CurrentEntity', async done =>
      testEditSetAndClearCurrentEntity<NurseCertificationDataEntryFacade>(done, facade));
    it('Save CurrentEntity', async done =>
      testSaveCurrentEntity<NurseCertificationDataEntryFacade>(done, facade, TestBed.get(HttpClient)));
    it('Update CurrentEntity', async done =>
      testUpdateCurrentEntity<NurseCertificationDataEntryFacade>(done, facade, TestBed.get(HttpClient)));
  });
});

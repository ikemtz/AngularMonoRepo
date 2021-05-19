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
import { environment } from '@env/nurse-cron';

import { CompetencyEffects } from '../+state/competency.effects';
import {
  CompetenciesPartialState,
  initialState,
  reducer as competencyReducer,
  COMPETENCIES_FEATURE_KEY
} from '../+state/competency.reducer';
import { CompetencyCrudFacade } from './crud.facade';
import { CompetencyApiService } from './api.service';
import { ICompetency, CompetencyProperties } from '../../../models/competencies-odata';

interface TestSchema {
  [COMPETENCIES_FEATURE_KEY]: CompetenciesPartialState;
}

export const createCompetency = () =>
  <ICompetency>{
    [CompetencyProperties.ID]: 'ID',
    [CompetencyProperties.NAME]: 'NAME',
    [CompetencyProperties.IS_ENABLED]: true,
  };

describe('CompetencyCrudFacade', () => {
  let facade: CompetencyCrudFacade;
  let store: Store<TestSchema>;



  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COMPETENCIES_FEATURE_KEY, competencyReducer, { initialState }),
          EffectsModule.forFeature([CompetencyEffects]),
          HttpClientTestingModule,
        ],
        providers: [CompetencyCrudFacade, CompetencyApiService],
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
      facade = TestBed.inject(CompetencyCrudFacade);
    });

    it('clearCurrentEntity() should set currentCompetency to null', async done => {
      try {
        let isNewActive = await readFirst(facade.isNewActive$);
        expect(isNewActive).toBeFalsy();

        facade.clearCurrentEntity();
        isNewActive = await readFirst(facade.isNewActive$);

        expect(isNewActive).toBeFalsy();
        expect(store).toBeTruthy();

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('New Entity Set And Clear CurrentEntity', async done =>
      testAddSetAndClearCurrentEntity<CompetencyCrudFacade>(done, facade));
    it('Existing Entity Set And Clear CurrentEntity', async done =>
      testEditSetAndClearCurrentEntity<CompetencyCrudFacade>(done, facade));
    it('Save CurrentEntity', async done =>
      testSaveCurrentEntity<CompetencyCrudFacade>(done, facade, TestBed.inject(HttpClient)));
    it('Update CurrentEntity', async done =>
      testUpdateCurrentEntity<CompetencyCrudFacade>(done, facade, TestBed.inject(HttpClient)));
  });
});

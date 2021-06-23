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

import { CertificationEffects } from '../+state/certification.effects';
import {
  CertificationsPartialState,
  initialState,
  reducer as certificationReducer,
  CERTIFICATIONS_FEATURE_KEY
} from '../+state/certification.reducer';
import { CertificationCrudFacade } from './crud.facade';
import { CertificationApiService } from './api.service';
import { ICertification, CertificationProperties } from '../../../models/certifications-odata';

interface TestSchema {
  [CERTIFICATIONS_FEATURE_KEY]: CertificationsPartialState;
}

export const createCertification = () =>
  <ICertification>{
    [CertificationProperties.ID]: 'ID',
    [CertificationProperties.NAME]: 'NAME',
    [CertificationProperties.IS_ENABLED]: true,
    [CertificationProperties.EXPIRES_ON_UTC]: new Date(),
  };

describe('CertificationCrudFacade', () => {
  let facade: CertificationCrudFacade;
  let store: Store<TestSchema>;



  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CERTIFICATIONS_FEATURE_KEY, certificationReducer, { initialState }),
          EffectsModule.forFeature([CertificationEffects]),
          HttpClientTestingModule,
        ],
        providers: [CertificationCrudFacade, CertificationApiService],
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
      facade = TestBed.inject(CertificationCrudFacade);
    });

    it('clearCurrentEntity() should set currentCertification to null', async done => {
      try {
        let isNewActive = await readFirst(facade.isNewActive$);
        expect(isNewActive).toBeFalsy();
        expect(store).toBeTruthy();

        facade.clearCurrentEntity();
        isNewActive = await readFirst(facade.isNewActive$);

        expect(isNewActive).toBeFalsy();

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('New Entity Set And Clear CurrentEntity', async done =>
      testAddSetAndClearCurrentEntity<CertificationCrudFacade>(done, facade));
    it('Existing Entity Set And Clear CurrentEntity', async done =>
      testEditSetAndClearCurrentEntity<CertificationCrudFacade>(done, facade));
    it('Save CurrentEntity', async done =>
      testSaveCurrentEntity<CertificationCrudFacade>(done, facade, TestBed.inject(HttpClient)));
    it('Update CurrentEntity', async done =>
      testUpdateCurrentEntity<CertificationCrudFacade>(done, facade, TestBed.inject(HttpClient)));
  });
});

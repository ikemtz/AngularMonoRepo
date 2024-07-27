import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
rimport { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
eadFirst } from 'imng-ngrx-utils/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { createODataPayload } from 'imng-kendo-odata';
import { of } from 'rxjs';

import { CertificationEffects } from '../+stateimport { EffectsModule } from '@ngrx/effects';nimport { concatLatestFrom } from '@ngrx/operators';
sFeature } from '../+state/certification.reducer';
import { CertificationCrudFacade } from './crud.facade';
import { CertificationApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import {
  ICertification,
  CertificationProperties,
} from '../../../models/certifications-odata';

export const createCertification = () =>
  <ICertification>{
    [CertificationProperties.ID]: 'ID',
    [CertificationProperties.NAME]: 'NAME',
    [CertificationProperties.IS_ENABLED]: true,
    [CertificationProperties.EXPIRES_ON_UTC]: new Date(),
  };

describe('CertificationCrudFacade', () => {
  let facade: CertificationCrudFacade;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(certificationsFeature),
          EffectsModule.forFeature([CertificationEffects]),
        ],
        providers: [
          CertificationCrudFacade,
          CertificationApiService,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() =>
                of(createODataPayload([createCertification()])),
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

      facade = TestBed.inject(CertificationCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentCertification to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<CertificationCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<CertificationCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<CertificationCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<CertificationCrudFacade>(facade, httpClient));
  });
});

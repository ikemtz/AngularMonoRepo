import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { createODataPayload } from 'imng-kendo-odata';
import { of } from 'rxjs';

import { CompetencyEffects } from '../+state/competency.effects';
import { competenciesFeature } from '../+state/competency.reducer';
import { CompetencyCrudFacade } from './crud.facade';
import { CompetencyApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import {
  ICompetency,
  CompetencyProperties,
} from '../../../models/competencies-odata';

export const createCompetency = () =>
  <ICompetency>{
    [CompetencyProperties.ID]: 'ID',
    [CompetencyProperties.NAME]: 'NAME',
    [CompetencyProperties.IS_ENABLED]: true,
  };

describe('CompetencyCrudFacade', () => {
  let facade: CompetencyCrudFacade;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(competenciesFeature),
          EffectsModule.forFeature([CompetencyEffects]),
        ],
        providers: [
          CompetencyCrudFacade,
          CompetencyApiService,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() => of(createODataPayload([createCompetency()]))),
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

      facade = TestBed.inject(CompetencyCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentCompetency to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<CompetencyCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<CompetencyCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<CompetencyCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<CompetencyCrudFacade>(facade, httpClient));
  });
});

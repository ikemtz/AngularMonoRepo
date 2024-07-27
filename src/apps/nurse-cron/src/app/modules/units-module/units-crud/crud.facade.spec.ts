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

import { UnitEffects } from '../+state/unit.effects';
import { unitsFeature } from '../+state/unit.reducer';
import { UnitCrudFacade } from './crud.facade';
import { UnitApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { createTestUnit } from '../../../models/units-odata';

describe('UnitCrudFacade', () => {
  let facade: UnitCrudFacade;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(unitsFeature),
          EffectsModule.forFeature([UnitEffects]),
        ],
        providers: [
          UnitCrudFacade,
          UnitApiService,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() => of(createODataPayload([createTestUnit()]))),
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      facade = TestBed.inject(UnitCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentUnit to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<UnitCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<UnitCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<UnitCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<UnitCrudFacade>(facade, httpClient));

    test('should load Buildings', async () => {
      facade.loadBuildings({});
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      const result = await readFirst(facade.buildings$);
      expect(result.length).toBe(1);
    });
  });
});

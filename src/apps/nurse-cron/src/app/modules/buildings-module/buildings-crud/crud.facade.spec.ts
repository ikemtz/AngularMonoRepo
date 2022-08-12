import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { createODataPayload } from 'imng-kendo-odata';
import { of } from 'rxjs';

import { BuildingEffects } from '../+state/building.effects';
import { buildingsFeature } from '../+state/building.reducer';
import { BuildingCrudFacade } from './crud.facade';
import { BuildingApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { IBuilding, BuildingProperties } from '../../../models/units-odata';

export const createBuilding = () =>
  <IBuilding>{
    [BuildingProperties.ID]: 'ID',
    [BuildingProperties.NAME]: 'NAME',
    [BuildingProperties.SITE_NAME]: 'SITE_NAME',
    [BuildingProperties.ADDRESS_LINE_1]: 'ADDRESS_LINE_1',
    [BuildingProperties.ADDRESS_LINE_2]: 'ADDRESS_LINE_2',
    [BuildingProperties.CITY_OR_MUNICIPALITY]: 'CITY_OR_MUNICIPALITY',
    [BuildingProperties.STATE_OR_PROVIDENCE]: 'STATE_OR_PROVIDENCE',
    [BuildingProperties.POSTAL_CODE]: 'POSTAL_CODE',
    [BuildingProperties.COUNTRY]: 'COU',
    [BuildingProperties.GPS_DATA]: 'GPS_DATA',
    [BuildingProperties.DELETED_BY]: 'DELETED_BY',
    [BuildingProperties.DELETED_ON_UTC]: new Date(),
  };

describe('BuildingCrudFacade', () => {
  let facade: BuildingCrudFacade;
  let store: Store;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { }); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(buildingsFeature),
          EffectsModule.forFeature([BuildingEffects]),
        ],
        providers: [
          BuildingCrudFacade,
          BuildingApiService,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createBuilding()]))) } },
        ],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      store = TestBed.inject(Store);
      facade = TestBed.inject(BuildingCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentBuilding to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<BuildingCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<BuildingCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<BuildingCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<BuildingCrudFacade>(facade, httpClient));
  });
});

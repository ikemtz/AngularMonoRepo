import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
rimport { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
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

import { HealthItemEffects } from '../+state/heimport { EffectsModule } from '@ngrx/effects';eimport { concatLatestFrom } from '@ngrx/operators';
 } from '../+state/health-item.reducer';
import { HealthItemCrudFacade } from './crud.facade';
import { HealthItemApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import {
  IHealthItem,
  HealthItemProperties,
} from '../../../models/health-items-odata';

export const createHealthItem = () =>
  <IHealthItem>{
    [HealthItemProperties.ID]: 'ID',
    [HealthItemProperties.NAME]: 'NAME',
    [HealthItemProperties.IS_ENABLED]: true,
  };

describe('HealthItemCrudFacade', () => {
  let facade: HealthItemCrudFacade;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(healthItemsFeature),
          EffectsModule.forFeature([HealthItemEffects]),
        ],
        providers: [
          HealthItemCrudFacade,
          HealthItemApiService,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() => of(createODataPayload([createHealthItem()]))),
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

      facade = TestBed.inject(HealthItemCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentHealthItem to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<HealthItemCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<HealthItemCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<HealthItemCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<HealthItemCrudFacade>(facade, httpClient));
  });
});

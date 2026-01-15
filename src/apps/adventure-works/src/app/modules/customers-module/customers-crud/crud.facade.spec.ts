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

import { CustomerEffects } from '../+state/customer.effects';
import { customersFeature } from '../+state/customer.reducer';
import { CustomerCrudFacade } from './crud.facade';
import { CustomerApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { createTestCustomer } from '../../../models/webapi';

describe('CustomerCrudFacade', () => {
  let facade: CustomerCrudFacade;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(customersFeature),
          EffectsModule.forFeature([CustomerEffects]),
        ],
        providers: [
          CustomerCrudFacade,
          CustomerApiService,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() =>
                of(createODataPayload([createTestCustomer()])),
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

      facade = TestBed.inject(CustomerCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentCustomer to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<CustomerCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<CustomerCrudFacade>(facade, httpClient));

    test('should load SalesAgents', async () => {
      facade.loadSalesAgents({});
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      const result = await readFirst(facade.salesAgents$);
      expect(result).toHaveLength(1);
    });
  });
});

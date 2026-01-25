///<reference types="jest" />
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  testDeleteCurrentEntity,
  testModalStateAddAndClearCurrentEntity,
  testModalStateEditAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { createODataPayload } from 'imng-kendo-odata';
import { of } from 'rxjs';

import {
  customersFeature,
  CustomerListEffects,
  CustomerCrudEffects,
} from './+state';
import { CustomerCrudFacade } from './customer.crud.facade';
import { CustomerApiService } from './customer.api.service';
import { createTestCustomer } from '../../models/webapi';
import { environment } from '@env';

describe('CustomerCrudFacade', () => {
  let facade: CustomerCrudFacade;
  let store: Store;
  let httpClient: HttpClient;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(customersFeature),
          EffectsModule.forFeature([CustomerListEffects, CustomerCrudEffects]),
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      store = TestBed.inject(Store);
      facade = TestBed.inject(CustomerCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentCustomer to null', async () => {
      let currentModalState = await readFirst(facade.currentModalState$);
      expect(currentModalState).toBeUndefined();

      facade.clearCurrentEntity();
      currentModalState = await readFirst(facade.currentModalState$);

      expect(currentModalState).toBeUndefined();
      expect(await readFirst(store)).toMatchSnapshot();
    });

    test('Add Modal State And Clear CurrentEntity', async () =>
      testModalStateAddAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Edit Modal state And Clear CurrentEntity', async () =>
      testModalStateEditAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<CustomerCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<CustomerCrudFacade>(facade, httpClient));
    test('it should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});

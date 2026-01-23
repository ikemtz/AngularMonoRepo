///<reference types="jest" />
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { readFirst } from 'imng-ngrx-utils/testing';
import { createODataPayload } from 'imng-kendo-odata';
import { of } from 'rxjs';

import {
  customersFeature,
  CustomerListEffects,
  CustomerLookupEffects,
  CustomerCrudEffects,
} from './+state';
import { CustomerLookupFacade } from './customer.lookup.facade';
import { createTestCustomer } from '../../models/webapi';
import { environment } from '@env';

describe('CustomerLookupFacade', () => {
  let facade: CustomerLookupFacade;
  let httpClient: HttpClient;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(customersFeature),
          EffectsModule.forFeature([
            CustomerListEffects,
            CustomerLookupEffects,
            CustomerCrudEffects,
          ]),
        ],
        providers: [
          CustomerLookupFacade,
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

      facade = TestBed.inject(CustomerLookupFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('should load SalesAgents', async () => {
      facade.loadSalesAgents({});
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      const result = await readFirst(facade.salesAgents$);
      expect(result).toHaveLength(1);
    });
  });
});

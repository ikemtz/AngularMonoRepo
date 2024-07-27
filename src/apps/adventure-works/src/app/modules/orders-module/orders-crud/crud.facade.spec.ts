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

import { OrderEffects } from '../+state/order.effects';
import { ordersFeature } from '../+state/order.reducer';
import { OrderCrudFacade } from './crud.facade';
import { OrderApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { createTestOrder } from '../../../models/odata';

describe('OrderCrudFacade', () => {
  let facade: OrderCrudFacade;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ordersFeature),
          EffectsModule.forFeature([OrderEffects]),
        ],
        providers: [
          OrderCrudFacade,
          OrderApiService,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() => of(createODataPayload([createTestOrder()]))),
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

      facade = TestBed.inject(OrderCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentOrder to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<OrderCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<OrderCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<OrderCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<OrderCrudFacade>(facade, httpClient));

    test('should load Customers', async () => {
      facade.loadCustomers({});
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      const result = await readFirst(facade.customers$);
      expect(result.length).toBe(1);
    });

    test('should load ShipToAddresses', async () => {
      facade.loadShipToAddresses({});
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      const result = await readFirst(facade.shipToAddresses$);
      expect(result.length).toBe(1);
    });

    test('should load BillToAddresses', async () => {
      facade.loadBillToAddresses({});
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      const result = await readFirst(facade.billToAddresses$);
      expect(result.length).toBe(1);
    });
  });
});

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

import { OrderEffects } from '../+state/order.effects';
import { ordersFeature } from '../+state/order.reducer';
import { OrderCrudFacade } from './crud.facade';
import { OrderApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { IOrder, OrderProperties, OrderStatusTypes, ShippingTypes } from '../../../models/odata';

export const createOrder = () =>
  <IOrder>{
    [OrderProperties.ID]: 'ID',
    [OrderProperties.ORDER_ID]: 0,
    [OrderProperties.REVISION_NUM]: 0,
    [OrderProperties.DATE]: new Date(),
    [OrderProperties.DUE_DATE]: new Date(),
    [OrderProperties.SHIP_DATE]: new Date(),
    [OrderProperties.STATUS_TYPE]: OrderStatusTypes.Processing,
    [OrderProperties.IS_ONLINE_ORDER]: true,
    [OrderProperties.NUM]: 'NUM',
    [OrderProperties.PURCHASE_ORDER_NUM]: 'PURCHASE_ORDER_NUM',
    [OrderProperties.CUSTOMER_ID]: 'CUSTOMER_ID',
    [OrderProperties.SHIP_TO_ADDRESS_ID]: 'SHIP_TO_ADDRESS_ID',
    [OrderProperties.BILL_TO_ADDRESS_ID]: 'BILL_TO_ADDRESS_ID',
    [OrderProperties.SHIPPING_TYPE]: ShippingTypes.Other,
    [OrderProperties.CREDIT_CARD_APPROVAL_CODE]: 'CREDIT_CARD_APP',
    [OrderProperties.SUB_TOTAL]: 0,
    [OrderProperties.TAX_AMT]: 0,
    [OrderProperties.FREIGHT]: 0,
    [OrderProperties.TOTAL_DUE]: 0,
    [OrderProperties.COMMENT]: 'COMMENT',
    [OrderProperties.CUSTOMER]: 'CUSTOMER',
    [OrderProperties.SHIP_TO_ADDRESS]: 'SHIP_TO_ADDRESS',
    [OrderProperties.BILL_TO_ADDRESS]: 'BILL_TO_ADDRESS',
  };

describe('OrderCrudFacade', () => {
  let facade: OrderCrudFacade;
  let store: Store;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { }); //NOSONAR

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
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createOrder()]))) } },
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
      expect(httpClient.get).toBeCalledTimes(1);
      const result = await readFirst(facade.customers$);
      expect(result.length).toBe(1);
    });

    test('should load ShipToAddresses', async () => {
      facade.loadShipToAddresses({});
      expect(httpClient.get).toBeCalledTimes(1);
      const result = await readFirst(facade.shipToAddresses$);
      expect(result.length).toBe(1);
    });

    test('should load BillToAddresses', async () => {
      facade.loadBillToAddresses({});
      expect(httpClient.get).toBeCalledTimes(1);
      const result = await readFirst(facade.billToAddresses$);
      expect(result.length).toBe(1);
    });
  });
});

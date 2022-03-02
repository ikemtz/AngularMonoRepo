import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing/src/testing-utils';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SaleOrderEffects } from '../+state/sale-order.effects';
import {
  SaleOrdersPartialState,
  initialState,
  reducer as saleOrdersReducer,
  SALE_ORDERS_FEATURE_KEY,
} from '../+state/sale-order.reducer';
import { SaleOrderCrudFacade } from './crud.facade';
import { SaleOrderApiService } from './api.service';
import { ISaleOrder, SaleOrderProperties } from '../../../models';
import { environment } from '../../../../environments/environment';

interface TestSchema {
  [SALE_ORDERS_FEATURE_KEY]: SaleOrdersPartialState;
}

export const createSaleOrder = () =>
  <ISaleOrder>{
    [SaleOrderProperties.ID]: 'ID',
    [SaleOrderProperties.SALES_ORDER_ID]: 0,
    [SaleOrderProperties.REVISION_NUM]: 0,
    [SaleOrderProperties.DATE]: new Date(),
    [SaleOrderProperties.DUE_DATE]: new Date(),
    [SaleOrderProperties.SHIP_DATE]: new Date(),
    [SaleOrderProperties.STATUS]: 0,
    [SaleOrderProperties.IS_ONLINE_ORDER]: true,
    [SaleOrderProperties.NUM]: 'NUM',
    [SaleOrderProperties.PURCHASE_ORDER_NUM]: 'PURCHASE_ORDER_NUM',
    [SaleOrderProperties.ACCOUNT_NUM]: 'ACCOUNT_NUM',
    [SaleOrderProperties.CUSTOMER_ID]: 'CUSTOMER_ID',
    [SaleOrderProperties.SHIP_TO_ADDRESS_ID]: 'SHIP_TO_ADDRESS_ID',
    [SaleOrderProperties.BILL_TO_ADDRESS_ID]: 'BILL_TO_ADDRESS_ID',
    [SaleOrderProperties.SHIP_METHOD]: 'SHIP_METHOD',
    [SaleOrderProperties.CREDIT_CARD_APPROVAL_CODE]: 'CREDIT_CARD_APP',
    [SaleOrderProperties.SUB_TOTAL]: 0,
    [SaleOrderProperties.TAX_AMT]: 0,
    [SaleOrderProperties.FREIGHT]: 0,
    [SaleOrderProperties.TOTAL_DUE]: 0,
    [SaleOrderProperties.COMMENT]: '',
    [SaleOrderProperties.SHIP_TO_ADDRESS]: 'SHIP_TO_ADDRESS',
    [SaleOrderProperties.BILL_TO_ADDRESS]: 'BILL_TO_ADDRESS',
    [SaleOrderProperties.CUSTOMER]: 'CUSTOMER',
  };

describe('SaleOrderCrudFacade', () => {
  let facade: SaleOrderCrudFacade;
  let store: Store<TestSchema>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SALE_ORDERS_FEATURE_KEY, saleOrdersReducer, { initialState }),
          EffectsModule.forFeature([SaleOrderEffects]),
          HttpClientTestingModule,
        ],
        providers: [DataPersistence, SaleOrderCrudFacade, SaleOrderApiService],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      store = TestBed.inject(Store);
      facade = TestBed.inject(SaleOrderCrudFacade);
    });

    test('clearCurrentEntity() should set currentSaleOrder to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      await testAddSetAndClearCurrentEntity<SaleOrderCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      await testEditSetAndClearCurrentEntity<SaleOrderCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      await testSaveCurrentEntity<SaleOrderCrudFacade>(facade, TestBed.inject(HttpClient)));
    test('Update CurrentEntity', async () =>
      await testUpdateCurrentEntity<SaleOrderCrudFacade>(facade, TestBed.inject(HttpClient)));
  });
});

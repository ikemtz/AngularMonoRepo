import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { ODataState, createODataPayload, createODataResult } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';

import { SaleOrderEffects } from '../+state/sale-order.effects';
import * as saleOrderActionTypes from '../+state/sale-order.actions';
import { SaleOrdersPartialState, initialState, reducer as saleOrdersReducer, SALE_ORDERS_FEATURE_KEY } from '../+state/sale-order.reducer';
import { SaleOrderListFacade } from './list.facade';
import { ISaleOrder, SaleOrderProperties } from '../../../models';
import { environment } from '../../../../environments/environment';

interface TestSchema {
  [SALE_ORDERS_FEATURE_KEY]: SaleOrdersPartialState;
}

export const createSaleOrder = () => <ISaleOrder>{
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

describe('SaleOrderListFacade', () => {
  let facade: SaleOrderListFacade;
  let store: Store<TestSchema>;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SALE_ORDERS_FEATURE_KEY, saleOrdersReducer, { initialState }),
          EffectsModule.forFeature([SaleOrderEffects]),
        ],
        providers: [
          DataPersistence,
          SaleOrderListFacade,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createSaleOrder()]))) } },
        ],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(SaleOrderListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadEntities() returns an array of (1)
     */
    it('loadEntities() should return a list of (1) with loading == false and httpClient.get is invoked', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      facade.loadEntities({});

      list = await readFirst(facade.gridData$);
      const loading = await readFirst(facade.loading$);
      expect(list.data.length).toBe(1);
      expect(loading).toBe(false);
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith('aw-odata/odata/v1/SaleOrders?&$count=true');

    });

    it('should get the grid state', async () => {
      const filteringState: ODataState = {
        filter: { logic: 'and', filters: [{ field: '💩', operator: 'eq', value: '🍑' }] },
      };
      let state = await readFirst(facade.gridODataState$);
      expect(state?.count).toBeUndefined();
      facade.loadEntities(filteringState);

      state = await readFirst(facade.gridODataState$);
      expect(state).toStrictEqual(filteringState);

      facade.loadEntities({});
      state = await readFirst(facade.gridODataState$);
      expect(state).toStrictEqual({});

    });

    /**
     * Use `saleOrdersLoaded` to manually submit list for state management
     */
    it('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      store.dispatch(saleOrderActionTypes.loadSaleOrdersSuccess(createODataResult([createSaleOrder(), createSaleOrder()])));

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(2);

    });

    it('should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});

import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import * as orderActionTypes from '../+state/order.actions';
import { OrderEffects } from '../+state/order.effects';
import { ordersFeature } from '../+state/order.reducer';
import { PrimeOrderListFacade } from './prime-list.facade';
import { environment } from '../../../../environments/environment';
import { createTestOrder, IOrder } from '../../../models/odata';
import {
  ODataClientService,
  ODataQuery,
  createODataResult,
} from 'imng-odata-client';
import { PrimeTableState } from 'imng-prime-table-odata';

describe('OrderListFacade', () => {
  let facade: PrimeOrderListFacade;
  let store: Store;
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
          PrimeOrderListFacade,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() => of(createODataResult([createTestOrder()]))),
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

      store = TestBed.inject(Store);
      facade = TestBed.inject(PrimeOrderListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadEntities() returns an array of (1)
     */
    test('loadEntities() should return a list of (1) with loading == false and httpClient.get is invoked', async () => {
      let list = await readFirst(facade.tableData$);
      expect(list.length).toBe(0);
      facade.loadEntities({});

      list = await readFirst(facade.tableData$);
      const loading = await readFirst(facade.loading$);
      expect(list.length).toBe(1);
      expect(loading).toBe(false);
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith(
        'aw-odata/odata/v1/Orders?$count=true',
      );

      facade.reloadEntities();
      expect(httpClient.get).toBeCalledTimes(2);
    });

    test('reloadEntities() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.tableData$);
      let isloading = await readFirst(facade.loading$);

      const service: {
        fetch: (
          endpoint: string,
          odataQuery: ODataQuery,
        ) => Observable<unknown>;
      } = TestBed.inject(ODataClientService);
      const response = of({
        value: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }],
        count: 3,
      });
      service.fetch = jest.fn(() => response);

      expect(list.length).toBe(0);
      expect(isloading).toBe(true);
      facade.reloadEntities();

      list = await readFirst(facade.tableData$);
      isloading = await readFirst(facade.loading$);

      expect(list.length).toBe(3);
      expect(isloading).toBe(false);
      expect(service.fetch).toBeCalledTimes(1);
    });

    test('it should get the grid state', async () => {
      const filteringState: PrimeTableState = {
        filters: { '💩': [{ operator: 'eq', value: '🍑' }] },
      };
      let state = await readFirst(facade.tableState$);
      expect(state?.multiSortMeta).toBeUndefined();
      facade.loadEntities(filteringState);

      state = await readFirst(facade.tableState$);
      expect(state).toStrictEqual({
        filters: { '💩': [{ operator: 'eq', value: '🍑' }] },
      });

      facade.loadEntities({});
      state = await readFirst(facade.tableState$);
      expect(state).toStrictEqual({});
    });

    /**
     * Use `ordersLoaded` to manually submit list for state management
     */
    test('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.tableData$);
      expect(list.length).toBe(0);
      store.dispatch(
        orderActionTypes.loadOrdersSuccess(
          createODataResult<IOrder>([createTestOrder(), createTestOrder()]),
        ),
      );

      list = await readFirst(facade.tableData$);
      expect(list.length).toBe(2);
    });
  });
});

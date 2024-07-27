import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import {
  ODataState,
  createODataPayload,
  createODataResult,
  ODataService,
  createEmptyODataResult,
} from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { Observable, of } from 'rxjs';

import * as orderActionTypes from '../+state/order.actions';
import { OrderEffects } from '../+state/order.effects';
import { ordersFeature } from '../+state/order.reducer';
import { OrderListFacade } from './list.facade';
import { environment } from '../../../../environments/environment';
import { createTestOrder } from '../../../models/odata';
import { IExtOrder } from '../models/ext-order';

export const createOrder = () =>
  <IExtOrder>{
    ...createTestOrder(),
    orderLineItemODataState: {},
    orderLineItemOData: createEmptyODataResult(),
    orderLineItemPagerSettings: false,
  };

describe('OrderListFacade', () => {
  let facade: OrderListFacade;
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
          OrderListFacade,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() => of(createODataPayload([createOrder()]))),
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
      facade = TestBed.inject(OrderListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadEntities() returns an array of (1)
     */
    test('loadEntities() should return a list of (1) with loading == false and httpClient.get is invoked', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      facade.loadEntities({});

      list = await readFirst(facade.gridData$);
      const loading = await readFirst(facade.loading$);
      expect(list.data.length).toBe(1);
      expect(loading).toBe(false);
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      expect(httpClient.get).toHaveBeenCalledWith(
        'aw-odata/odata/v1/Orders?&$count=true',
      );

      facade.reloadEntities();
      expect(httpClient.get).toHaveBeenCalledTimes(2);
    });

    test('reloadEntities() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.gridData$);
      let isloading = await readFirst(facade.loading$);

      const service: {
        fetch: (
          endpoint: string,
          odataState: ODataState,
        ) => Observable<unknown>;
      } = TestBed.inject(ODataService);
      const response = of({
        data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }],
        total: 3,
      });
      service.fetch = jest.fn(() => response);

      expect(list.data.length).toBe(0);
      expect(isloading).toBe(true);
      facade.reloadEntities();

      list = await readFirst(facade.gridData$);
      isloading = await readFirst(facade.loading$);

      expect(list.data.length).toBe(3);
      expect(isloading).toBe(false);
      expect(service.fetch).toHaveBeenCalledTimes(1);
    });

    test('it should get the grid state', async () => {
      const filteringState: ODataState = {
        filter: {
          logic: 'and',
          filters: [{ field: '💩', operator: 'eq', value: '🍑' }],
        },
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
     * Use `ordersLoaded` to manually submit list for state management
     */
    test('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      store.dispatch(
        orderActionTypes.loadOrdersSuccess(
          createODataResult([createOrder(), createOrder()]),
        ),
      );

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(2);
    });

    test('it should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});

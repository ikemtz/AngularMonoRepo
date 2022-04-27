import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { ODataState, createODataPayload, createODataResult, ODataService } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { Observable, of } from 'rxjs';

import * as orderActionTypes from '../+state/order.actions';
import * as orderLineItemActionTypes from '../+state/order-line-item.actions';
import { OrderLineItemEffects } from '../+state/order-line-item.effects';
import { ordersFeature } from '../+state/order.reducer';
import { OrderLineItemListFacade } from './list.facade';
import { environment } from '../../../../environments/environment';
import { createOrder } from '../orders-list/list.facade.spec';
import { IOrderLineItem, OrderLineItemProperties } from '../../../models/odata';
import { OrderEffects } from '../+state/order.effects';

export const createOrderLineItem = () => <IOrderLineItem>{
  [OrderLineItemProperties.ID]: 'ID',
  [OrderLineItemProperties.ORDER_ID]: 'ORDER_ID',
  [OrderLineItemProperties.ORDER_QTY]: 0,
  [OrderLineItemProperties.PRODUCT_ID]: 'PRODUCT_ID',
  [OrderLineItemProperties.UNIT_PRICE]: 0,
  [OrderLineItemProperties.UNIT_PRICE_DISCOUNT]: 0,
  [OrderLineItemProperties.LINE_TOTAL]: 0,
  [OrderLineItemProperties.ORDER]: 'ORDER',
  [OrderLineItemProperties.PRODUCT]: 'PRODUCT',
};

describe('OrderLineItemListFacade', () => {
  let facade: OrderLineItemListFacade;
  let store: Store;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { }); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(ordersFeature),
          EffectsModule.forFeature([OrderEffects, OrderLineItemEffects]),
        ],
        providers: [
          OrderLineItemListFacade,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createOrderLineItem()]))) } },
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

      store = TestBed.inject(Store);
      facade = TestBed.inject(OrderLineItemListFacade);
      httpClient = TestBed.inject(HttpClient);
      facade.parentGridId = 'ORDER_ID';
    });

    /**
     * The initially generated facade::loadEntities() returns an array of (1)
     */
    test('loadEntities() should return a list of (1) with loading == false and httpClient.get is invoked', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      store.dispatch(orderActionTypes.loadOrdersSuccess(
        createODataResult([
          { ...createOrder(), id: 'ORDER_ID' }])));
      facade.loadEntities({});

      list = await readFirst(facade.gridData$);
      const loading = await readFirst(facade.loading$);
      expect(list.data.length).toBe(1);
      expect(loading).toBe(false);

      const gridPagerSettings$ = await readFirst(facade.gridPagerSettings$);
      expect(gridPagerSettings$).toBe(false);

      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith(
        `aw-odata/odata/v1/OrderLineItems?$filter=orderId eq 'ORDER_ID'&$count=true`);

      facade.reloadEntities();
      expect(httpClient.get).toBeCalledTimes(2);
    });

    test('reloadEntities() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.gridData$);
      let isloading = await readFirst(facade.loading$);

      const service: { fetch: (endpoint: string, odataState: ODataState) => Observable<unknown>; } = TestBed.inject(ODataService);
      const response = of({ data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }], total: 3 });
      service.fetch = jest.fn(() => response);

      expect(list.data.length).toBe(0);
      expect(isloading).toBe(true);
      store.dispatch(orderActionTypes.loadOrdersSuccess(
        createODataResult([
          { ...createOrder(), id: 'ORDER_ID' }])));
      facade.reloadEntities();

      list = await readFirst(facade.gridData$);
      isloading = await readFirst(facade.loading$);

      expect(list.data.length).toBe(3);
      expect(isloading).toBe(false);
      expect(service.fetch).toBeCalledTimes(1);
    });

    test('it should get the grid state', async () => {
      const filteringState: ODataState = {
        filter: { logic: 'and', filters: [{ field: '💩', operator: 'eq', value: '🍑' }] },
      };
      let state = await readFirst(facade.gridODataState$);
      expect(state?.count).toBeUndefined();

      store.dispatch(orderActionTypes.loadOrdersSuccess(
        createODataResult([
          { ...createOrder(), id: 'ORDER_ID' }])));

      facade.loadEntities(filteringState);

      state = await readFirst(facade.gridODataState$);
      expect(state).toStrictEqual(filteringState);

      facade.loadEntities({});
      state = await readFirst(facade.gridODataState$);
      expect(state).toMatchSnapshot();
    });

    /**
     * Use `orderLineItemsLoaded` to manually submit list for state management
     */
    test('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      store.dispatch(orderActionTypes.loadOrdersSuccess(
        createODataResult([
          { ...createOrder(), id: 'ORDER_ID' }])));
      store.dispatch(orderLineItemActionTypes.loadOrderLineItemsSuccess(
        { orderId: 'ORDER_ID', odataResult: createODataResult([createOrderLineItem(), createOrderLineItem()]) }));

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(2);
    });

    test('it should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});
